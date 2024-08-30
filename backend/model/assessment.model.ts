import { IAssessment } from "@/interface/courses";
import mongoose, { Schema } from "mongoose";


const assessmentSchema = new Schema<IAssessment>({
  assessments: {
    required: true,
    type: [Object],
  },
  otherMarks: {
    required: true,
    type: Number,
  },
});

const AssessmentModel = mongoose.models.Assessment || mongoose.model("Assessment", assessmentSchema);

export default AssessmentModel;