import { IUser } from "@/interface/courses";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
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
  socialMedia: { type: Object, required: false },
  profilePicture: { type: String, required: false },
});

const UserModel: mongoose.Model<IUser> =
  mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
