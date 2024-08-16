import { db } from "@/backend/model";
import { ILesson } from "@/interface/courses";
import { replaceMongoIdInObject } from "@/lib/convertData";

export const getLesson = async (lessonId: string) => {
    const lesson = await db.lesson.findById(lessonId).lean();

    if (!lesson) {
        return null; 
    }
    
    //@ts-ignore
    return replaceMongoIdInObject(lesson)
}