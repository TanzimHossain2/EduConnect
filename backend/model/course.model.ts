import { ICourse } from "@/interface/courses";
import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  subtitle: { type: String},
  description: { type: String, required: true },
  price: { type: Number, default: 0 },
  thumbnail: { type: String },
  modules: [{ type: Schema.Types.ObjectId, ref: "Module" }],
  learning: [{ type: String }],
  active: { type: Boolean, default: false },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  instructor: { type: Schema.Types.ObjectId, ref: "User" },
  quizSet: { type: Schema.Types.ObjectId, ref: "Quiz", default: null },
  testimonials: [{ type: Schema.Types.ObjectId, ref: "Testimonial" }],
},{ timestamps: true });

// indexing the course schema
courseSchema.index({ title: "text", description: "text" });
courseSchema.index({ category: 1, instructor: 1 });

const CourseModel: mongoose.Model<ICourse> =
  mongoose.models.Course || mongoose.model("Course", courseSchema);

export default CourseModel;
 