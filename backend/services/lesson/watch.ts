import { db } from "@/backend/model";
import { nestedReplaceMongoIdInObject } from "@/utils/convertData";

export const getWatchData = async (lessonId: string, moduleId: string, userId: string) => {

    if (!lessonId || !moduleId || !userId) {
        return null;
    }


    try {
        const watch = await db.watch.findOne({
            lesson: lessonId,
            module: moduleId,
            user: userId,
        }).lean();


        return nestedReplaceMongoIdInObject(watch);
        
    } catch (err) {
        console.error(err);
        return null;
    }
}