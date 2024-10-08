"use server";

import { db } from "@/backend/model";
import { createLesson } from "@/backend/services/courses";
import mongoose from "mongoose";

export const addLesson = async (data: FormData) => {
  try {
    const title = data.get("title") as string;
    const slug = data.get("slug") as string;
    const moduleId = data.get("moduleId") as string;
    const order = parseInt(data.get("order") as string);

    const lessonData = {
      title,
      slug,
      module: moduleId,
      order,
    };

    const lesson = await createLesson(lessonData);

    if (!lesson) {
      return {
        error: "Lesson not found",
        code: 404,
      };
    }

    // find module and add lesson to it
    const resModule = await db.module.findById(moduleId);

    if (!resModule) {
      return {
        error: "Module not found",
        code: 404,
      };
    }

    // add lesson to module
    resModule.lessonIds.push(lesson.id);
    await resModule.save();

    return {
      lessonId: lesson.id.toString(),
      code: 201,
    };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
      code: 500,
    };
  }
};

export const reOrderLessons = async (
  updateData: { id: string; position: number }[]
) => {
  try {
    const promises = updateData.map(async ({ id, position }) => {
      const resLesson = await db.lesson.findById(id);
      if (!resLesson) {
        return {
          error: "Lesson not found",
          code: 404,
        };
      }

      resLesson.order = position;
      await resLesson.save();
    });

    await Promise.all(promises);

    return {
      message: "Lessons reordered",
      code: 201,
    };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
      code: 500,
    };
  }
};

export const updateLesson = async (lessonId:string, data: any) => {

  try {
    const lesson = await db.lesson.findByIdAndUpdate (lessonId, data, { new: true });

    if (!lesson) {
      return {
        error: "Lesson not found",
        code: 404,
      };
    }

    return {
      message: "Lesson updated",
      code: 200,
    };
    
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
      code: 500,
    };
    
  }

}


export const ChangeLessonPublishState = async (lessonId: string) => {
  try {
    const lesson = await db.lesson.findById(lessonId); 
    if (!lesson) {
      return {
        error: "Lesson not found",
        code: 404,
      };
    }

    lesson.active = !lesson.active;
    await lesson.save();


    return {
      message: "Lesson updated",
      activeState: lesson.active,
      code: 200,
    };

  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
      code: 500,
    };
  }
}


// delete lesson
export const deleteLesson = async (lessonId: string, moduleId:string) => {
  try {
    const moduleData = await db.module.findById(moduleId);

    if (!moduleData) {
      return {
        error: "Module not found",
        code: 404,
      };
    }

    // @ts-ignore  // remove lesson from module
    moduleData.lessonIds.pull(new mongoose.Types.ObjectId(lessonId));

    await db.lesson.findByIdAndDelete(lessonId);

    await moduleData.save();

  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
      code: 500,
    };
    }
  }

