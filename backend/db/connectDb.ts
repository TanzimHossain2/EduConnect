const MONGO_URI = process.env.MONGO_URI as string;
import mongoose, { Mongoose } from "mongoose";

export async function dbConnect(): Promise<Mongoose | void> {
  try {
    const conn = await mongoose.connect(String(MONGO_URI));
    return conn;
  } catch (err) {
    console.error(err);
  }
}
