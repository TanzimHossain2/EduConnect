import { IUser } from "@/interface/courses";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email address format",
      },
    },
    phone: { type: String, required: true, unique: true },
    role: {
      required: true,
      type: String,
      enum: ["admin", "instructor", "student"],
      default: "student",
    },
    bio: { type: String, required: false },
    social_media: { type: Object, required: false },
    profile_picture: { type: String, required: false },
    designation: { type: String, required: false },
  },
  { timestamps: true }
);

const UserModel: mongoose.Model<IUser> =
  mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
