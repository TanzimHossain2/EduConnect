import { IWatch, State } from "@/interface/courses";
import mongoose, { Schema } from "mongoose";

const watchSchema = new Schema<IWatch>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    lesson: { type: Schema.Types.ObjectId, ref: "Lesson", required: true },
    lastTime: { type: Number, required: true, default: 0 },
    module: { type: Schema.Types.ObjectId, ref: "Module", required: true },
    state: {
      type: String,
      required: true,
      enum: Object.values(State),
      default: State.started,
    },
  },
  { timestamps: true }
);

const WatchModel: mongoose.Model<IWatch> =
  mongoose.models.Watch || mongoose.model("Watch", watchSchema);

export default WatchModel;
