import { ITestimonial } from "@/interface/courses";
import mongoose, { Schema } from "mongoose";

const testimonialSchema = new Schema<ITestimonial>({
    content: {
        required: true,
        type: String,
    },
    user: {
        required: true,
        type: String,
    },
    courseId: {
        required: true,
        type: String,
    },
    rating: {
        required: true,
        type: Number,
    },
}, { timestamps: true });

const TestimonialModel: mongoose.Model<ITestimonial> =
    mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);


    export default TestimonialModel;
