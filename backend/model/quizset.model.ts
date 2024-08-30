import { IQuizSet } from "@/interface/courses";
import mongoose, { Schema } from "mongoose";

const quizSetSchema = new Schema<IQuizSet>({
  title: {
    required: true,
    type: String,
  },
  description: {
    type: String,
  },
  slug: {
    required: true,
    type: String,
  },
  active: {
    required: true,
    type: Boolean,
    default: false,
  },
  quizIds: {
    type: [Schema.Types.ObjectId],
    ref: "Quiz",
  },
});

const QuizSetModel =
  mongoose.models.QuizSet || mongoose.model("QuizSet", quizSetSchema);

export default QuizSetModel;