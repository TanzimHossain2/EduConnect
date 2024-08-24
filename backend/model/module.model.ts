/* eslint-disable @next/next/no-assign-module-variable */
import { IModule } from "@/interface/courses";
import mongoose, { Schema } from "mongoose";
import { db } from ".";

const moduleSchema = new Schema<IModule>( 
  {
    title: {
      required: true,
      type: String,
    },
    description: {
      type: String,
    },

    active: { type: Boolean, 
      default: false 
    },

    slug: {
      required: true,
      type: String,
    },
    course: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    lessonIds: {
      required: true,
      type: [Schema.Types.ObjectId],
      ref: "Lesson",
    },
    duration: {
      type: Number,
      default: 0,
    },
    order: {
      required: true,
      type: Number,
    },
  },
  { timestamps: true }
);



// Pre middleware to delete associated lessons when a module is deleted
moduleSchema.pre("findOneAndDelete", async function (next) {
  try {
    const module = await this.model.findOne(this.getQuery());
    console.log(module);
    
    if (module) {
      await db.lesson.deleteMany({ _id: { $in: module.lessonIds } });
    }

    // delete aslo from course modules array
    await db.course.updateOne(
      { _id: module.course },
      { $pull: { modules: module._id } }
    );


    next();
  } catch (error) {
    console.log("error in middleware", error);
    next(error instanceof Error ? error : new Error("An error occurred"));
  }
});




const ModuleModel: mongoose.Model<IModule> =
  mongoose.models.Module || mongoose.model("Module", moduleSchema);

export default ModuleModel;
