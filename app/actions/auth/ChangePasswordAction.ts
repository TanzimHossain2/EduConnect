"use server";

import { db } from "@/backend/model";
import { generateHash, hashMatched } from "@/utils/hasing";

export const changePassword = async (
  email: string,
  oldPassword: string,
  newPassword: string
) => {
  try {
    const user = await db.user.findOne({ email: email });

    if (!user) {
      return { error: "User not found" };
    }

    const isMatch = await hashMatched(oldPassword, user.password);

    if (!isMatch) {
      return { error: "Old password does not match" };
    }

    const hashedPassword = await generateHash(newPassword);

    const filter = { email: email };

    const updated = await db.user.findOneAndUpdate(filter, {
      password: hashedPassword,
    });

    if (!updated) {
      return { error: "Error updating password in database" };
    }

    return {
      message: "Password changed successfully",
      code: 200,
    };
  } catch (err: any) {
    return { error: err.message };
  }
};
