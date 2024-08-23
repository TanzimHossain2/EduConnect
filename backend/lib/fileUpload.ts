import fs from "fs";
import { pipeline, Readable } from "stream";
import { promisify } from "util";

const pump = promisify(pipeline);

interface File {
  name: string;
  stream: () => ReadableStream<Uint8Array>;
}

export const fileUpload = async (file: File | null, destination: string): Promise<void | Error> => {
  if (!destination || !file) {
    return new Error("Missing required fields");
  }

  try {
    // Generate a unique file name
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `${destination}/${fileName}`;

    // Convert the file stream to a Node.js ReadableStream
    const reader = file.stream().getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }

    const nodeStream = Readable.from(chunks);

    // Write the file to the destination
    await pump(nodeStream, fs.createWriteStream(filePath));

  } catch (err) {
    console.error("Error uploading file:", err);
    return new Error("Failed to upload file");
  }
};