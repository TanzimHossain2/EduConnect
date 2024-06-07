import mongoose, { Connection } from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;
const cached: { connection?: Connection; promise?: Promise<Connection> } = {};

const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds

async function connectWithRetry(attempt = 1): Promise<Connection> {
  const opts = {
    bufferCommands: false,
    serverSelectionTimeoutMS: 30000,
  };

  try {
    await mongoose.connect(MONGO_URI, opts);
    return mongoose.connection;
  } catch (err) {
    if (attempt <= MAX_RETRIES) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error(
        `MongoDB connection unsuccessful, retrying in ${
          RETRY_DELAY / 1000
        } seconds... (Attempt ${attempt} of ${MAX_RETRIES})`,
        errorMessage
      );
      await new Promise((res) => setTimeout(res, RETRY_DELAY));
      return connectWithRetry(attempt + 1);
    } else {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      throw new Error(
        `Failed to connect to MongoDB after ${MAX_RETRIES} attempts: ${errorMessage}`
      );
    }
  }
}

export async function dbConnect(): Promise<Connection> {
  if (!MONGO_URI) {
    throw new Error(
      "Please define the MONGO_URI environment variable inside .env.local"
    );
  }

  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    cached.promise = connectWithRetry();
  }

  try {
    cached.connection = await cached.promise;
    console.log("Connected to MongoDB");
  } catch (e) {
    cached.promise = undefined;
    throw e;
  }

  return cached.connection;
}

// Graceful shutdown handling
process.on('SIGINT', async () => {
    if (cached.connection) {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    }
    process.exit(0);
  });
  
  process.on('SIGTERM', async () => {
    if (cached.connection) {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    }
    process.exit(0);
  });