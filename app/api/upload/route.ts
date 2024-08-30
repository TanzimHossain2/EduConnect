import { UpdateCourse } from "@/app/actions/course";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { pipeline, Readable } from "stream";
import { promisify } from "util";

const pump = promisify(pipeline);

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("files") as File | null;
    const destination = formData.get("destination") as string | null;
    const courseId = formData.get("courseId") as string | null;

    if (!destination || !file || !courseId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `${destination}/${fileName}`;

    // Convert the file stream to a Node.js ReadableStream
    const reader = file.stream().getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    const nodeStream = Readable.from(chunks);

    // Write the file to the destination
    await pump(nodeStream, fs.createWriteStream(filePath));

    //update course thumbnail
    const update = await UpdateCourse(courseId, { thumbnail: fileName });
    if (!update) {
      return new NextResponse("Failed to update course", { status: 500 });
    }

    return new NextResponse(
      JSON.stringify({
        message: `File ${file.name} uploaded to ${destination}`,
        fileName,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err, "--------------");
    return new NextResponse("Something went wrong", { status: 500 });
  }
};
