import { IModule } from "@/interface/courses";
import mongoose, { Schema } from "mongoose";

const moduleSchema = new Schema<IModule>( 
  {
    title: {
      required: true,
      type: String,
    },
    description: {
      type: String,
    },

    active: { type: Boolean, 
      default: false 
    },

    slug: {
      required: true,
      type: String,
    },
    course: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    lessonIds: {
      required: true,
      type: [Schema.Types.ObjectId],
    },
    duration: {
      type: Number,
      default: 0,
    },
    order: {
      required: true,
      type: Number,
    },
  },
  { timestamps: true }
);

const ModuleModel: mongoose.Model<IModule> =
  mongoose.models.Module || mongoose.model("Module", moduleSchema);

export default ModuleModel;
