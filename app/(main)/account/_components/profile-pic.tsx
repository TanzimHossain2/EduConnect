"use client";

import { UpdateProfilePic } from "@/app/actions/account";
import { useUser } from "@/hooks/useUser";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  profilePicture: string;
  firstName: string;
  email: string;
}

const ProfilePicture: React.FC<Props> = ({
  profilePicture,
  firstName,
  email,
}) => {
  const [uploading, setUploading] = useState(false);

  const { setUser, user } = useUser();

  const loadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const reader = new FileReader();
    reader.onload = async () => {
      const dataURL = reader.result as string;

      try {
        const response = await UpdateProfilePic(dataURL, email);

        if (response.error) {
          throw new Error(response.error);
        }

        setUser({
          ...user,
          profilePicture: response.secure_url || "",
        });

        toast.success("Profile picture updated successfully!", {
          duration: 2300,
          icon: "🚀",
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to upload image. Please try again.");
      } finally {
        setUploading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <input
        id="pro-img"
        name="profile-image"
        type="file"
        className="hidden"
        onChange={loadFile}
        accept="image/*"
      />
      <div className="relative size-28 mx-auto">
        <Image
          src={user?.profilePicture || profilePicture}
          className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800"
          id="profile-banner"
          alt={firstName}
          width={112}
          height={112}
        />
        <label className="absolute inset-0 cursor-pointer" htmlFor="pro-img">
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full">
              Uploading...
            </div>
          )}
        </label>
      </div>
    </>
  );
};

export default ProfilePicture;
