import { IReport } from "@/interface/courses";
import mongoose, { Schema,Model } from "mongoose";

const reportSchema = new Schema<IReport>({
  totalCompletedLessons: {
    required: true,
    type: [Schema.Types.ObjectId],
  },

  totalCompletedModules: {
    required: true,
    type: [Schema.Types.ObjectId],
  },

  course: { type: Schema.ObjectId, ref: "Course" },

  student: { type: Schema.ObjectId, ref: "User" },

  quizAssessment: { type: Schema.ObjectId, ref: "Assessment" },
});


const ReportModel : Model<IReport>  = mongoose.models.Report || mongoose.model("Report", reportSchema);

export default ReportModel;
