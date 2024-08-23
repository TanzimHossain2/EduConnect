"use server";

import { db } from "@/backend/model";
import { create } from "@/backend/services/courses";
import { getLoggedInUser } from "@/lib/loggedin-user";
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
