import { db } from "@/backend/model";
import { nestedReplaceMongoIdInObject, replaceMongoIdInObject } from "@/utils/convertData";

export const getLesson = async (lessonId: string) => {
  try {
    const lesson = await db.lesson.findById(lessonId).lean();

    if (!lesson) {
      return null;
    }

    //@ts-ignore
    return replaceMongoIdInObject(lesson);
  } catch (err) {
    console.error(err);
    return null;
  }
};

//create lesson
export const createLesson = async (lessonData: any) => {
  try {
    const lesson = await db.lesson.create(lessonData);

    if (!lesson) {
      return null;
    }

    return {
      id: lesson._id,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

// get lessons by slug

export const getLessonBySlug = async (slug: string) => {
  try {
    const lesson = await db.lesson.findOne({ slug }).lean();

    if (!lesson) {
      return null;
    }

    return nestedReplaceMongoIdInObject(lesson);
  } catch (err) {
    console.error(err);
    return null;
  }
}
