import { ICategory } from "@/interface/courses";
import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema<ICategory>({
  title: { type: String, required: true },
  description: { type: String, required: false },
  thumbnail: { type: String, required: true },
},{timestamps: true});

const CategoryModel: mongoose.Model<ICategory> =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default CategoryModel; 
