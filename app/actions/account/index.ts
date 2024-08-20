"use server";

import { db } from "@/backend/model";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

// Configure Cloudinary once
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface UpdateProfilePicResponse {
  secure_url?: string;
  error?: string;
  code?: number;
}

export const UpdateProfilePic = async (
  profilePic: string,
  email: string
): Promise<UpdateProfilePicResponse> => {
  try {
    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(profilePic, {
      upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    });

    const { secure_url } = uploadResult;

    if (!secure_url) {
      throw new Error("Cloudinary upload failed: No secure_url returned");
    }

    // Update user's profile picture in the database
    const filter = { email };
    const updateResult = await db.user.findOneAndUpdate(filter, {
      profilePicture: secure_url,
    });

    if (!updateResult) {
      throw new Error("Failed to update profile picture in the database");
    }

    revalidatePath("/");

    return { secure_url };
  } catch (error) {
    console.error("Error updating profile picture:", error);
    return {
      error: (error as Error).message || "An unexpected error occurred.",
      code: 500,
    };
  }
};
