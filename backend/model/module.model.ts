import { IModule } from "@/interface/courses";
import mongoose, { Schema, ObjectId } from "mongoose";

const moduleSchema = new Schema<IModule>({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },

  status: {
    required: true,
    type: String,
  },
  slug: {
    required: true,
    type: String,
  },
  course: {
    required: true,
    type: String,
  },
  lessonIds: {
    required: true,
    type: [String],
  },
  duration: {
    required: true,
    type: Number,
  },
},{timestamps: true});

const ModuleModel: mongoose.Model<IModule> =
  mongoose.models.Module || mongoose.model("Module", moduleSchema);

export default ModuleModel;
