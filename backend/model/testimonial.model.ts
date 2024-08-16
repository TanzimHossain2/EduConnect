import { ITestimonial } from "@/interface/courses";
import mongoose, { Schema } from "mongoose";

const testimonialSchema = new Schema<ITestimonial>(
  {
    content: {
      required: true,
      type: String,
    },
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },
    courseId: {
      required: true,
      type: Schema.ObjectId,
      ref: "Course",
    },
    rating: {
      required: true,
      type: Number,
    },
  },
  { timestamps: true }
);

const TestimonialModel: mongoose.Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model("Testimonial", testimonialSchema);

export default TestimonialModel;
