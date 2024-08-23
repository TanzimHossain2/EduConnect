import { db } from "@/backend/model";
import { replaceMongoIdInObject } from "@/utils/convertData";

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
