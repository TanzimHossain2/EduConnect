import { IEnrollment } from "@/interface/courses";
import mongoose, { Schema } from "mongoose";

const enrollmentSchema = new Schema<IEnrollment>({
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    student: { type: Schema.Types.ObjectId, ref: "User" },
    completion_date : { type: Date },
    enrollment_date : { type: Date, required: true },
    status : { type: String, required: true },
    method : { type: String },

    }, { timestamps: true }); 

const EnrollmentModel = mongoose.models.Enrollment || mongoose.model("Enrollment", enrollmentSchema);

export default EnrollmentModel;
