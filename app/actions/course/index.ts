"use server";

import { db } from "@/backend/model";
import { create } from "@/backend/services/courses";
import { getLoggedInUser } from "@/lib/loggedin-user";
import mongoose, { ObjectId } from "mongoose";
import z from "zod";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required!",
  }),
  description: z.string().min(1, {
    message: "Description is required!",
  }),

  instructor: z.optional(z.string()),
  
});

type CourseData = z.infer<typeof formSchema>;

export const CreateCourse = async (data: CourseData) => {
  try {
    const loggedUser = await getLoggedInUser();

    if (!loggedUser) {
      return {
        error: "User not found",
        code: 404,
      };
    }

    const form = formSchema.parse(data);

    form.instructor = loggedUser.id; 

    const course = await create(form);

    return {
      course,
      code: 201,
    };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
      code: 500,
    };
  }
};


export const UpdateCourse = async (courseId: string, data: any) => {
  try {
    const res = await db.course.findByIdAndUpdate(courseId, data, {
      new: true,
    }).lean();

    if (!res) {
      return {
        error: "Course not found",
        code: 404,
      };
    }
    
    return {
      Message: "Course updated successfully",
      code: 200,
    };
    
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
      code: 500,
    };
  }
}

export const changeCoursePublishState = async (courseId: string) => {
  try {
    const course = await db.course.findById(courseId); 
    if (!course) {
      return {
        error: "Course not found",
        code: 404,
      };
    }

    course.active = !course.active;
    await course.save(); 
     
    return {
      message: "Course updated",
      activeState: course.active,
      code: 200,
    };

  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
      code: 500,
    };
  }

}


export const deleteCourse  = async (courseId: string) => {
try {
   // Find the course with its associated modules
   const course = await db.course.findById(courseId).populate("modules");
   
   if (!course) {
    return {
      error: "Course not found",
      code: 404,
    };
  }

    // Loop through each module and delete its lessons
    for (const moduleId of course.modules) {
      const moduleData = await db.module.findById(moduleId);

      if (moduleData) {
        // Delete the module itself
        await db.module.findByIdAndDelete(moduleId);
      }
    }

    // Delete the course
    await db.course.findByIdAndDelete(courseId);

    return {
      message: "Course and associated modules and lessons deleted",
      code: 200,
    };

} catch (err) {
  console.log("Error deleting course:", err);

  return {
    error: err instanceof Error ? err.message : "Something went wrong",
    code: 500,
  };
}
}


export const updateQuizSetForCourse = async (courseId: string, dataToUpdate:any) => {
  try {
    const data: { quizSet?: any } = {};
    data["quizSet"] = new mongoose.Types.ObjectId(dataToUpdate.quizSetId);

    const res = await db.course.findByIdAndUpdate(courseId, data, {
      new: true,
    }).lean();

    if (!res) {
      return {
        error: "Course not found",
        code: 404,
      };
    }

    return {
      message: "Course updated successfully",
      code: 200,
    };

  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
      code: 500,
    };
  }
}
