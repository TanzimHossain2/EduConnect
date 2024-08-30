import { ILesson } from "@/interface/courses";
import mongoose, { Schema } from "mongoose";

const lessonSchema = new Schema<ILesson>({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: false,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
    default: 0,
  },
  video_url: {
    required: false,
    type: String,
  },
  active: {
    required: true,
    type: Boolean,
    default: false,
  },
  slug: {
    required: true,
    type: String,
  },
  access: {
    type: String,
    required: true,
    default: "private",
    enum: ["public", "private"],
  },
  order: {
    required: true,
    type: Number,
  },
});

const LessonModel =
  mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);

export default LessonModel;
