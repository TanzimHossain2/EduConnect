import { IQuiz } from "@/interface/courses";
import mongoose, { Schema } from "mongoose";

const quizSchema = new Schema<IQuiz>({
  title: {
    required: true,
    type: String,
  },
  description: {
    type: String,
  },
  explanations: {
    type: String,
  },
  slug: {
    type: String,
  },
  marks: {
    required: true,
    default: 5,
    type: Number,
  },
  options: [
    {
      text: {
        required: true,
        type: String,
      },
      is_correct: {
        required: true,
        type: Boolean,
      },
    },
  ],
});

const QuizModel =
  mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);

export default QuizModel;