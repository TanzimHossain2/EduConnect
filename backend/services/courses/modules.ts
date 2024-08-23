import { db } from "@/backend/model";
import { nestedReplaceMongoIdInObject } from "@/utils/convertData";

export const createModule = async (moduleData: any) => {
  try {
    const res = await db.module.create(moduleData);
    return JSON.parse(JSON.stringify(res));
  } catch (err) {
    throw new Error(err as any);
  }
};

export const getModuleById = async (moduleId: string) => {
  if (!moduleId) {
    return null;
  }

  try {
    const res = await db.module.findById(moduleId)
    .populate({
      path: "lessonIds",
      model: db.lesson,
    })
    .lean();

    if (!res) {
      return null;
    }

    return nestedReplaceMongoIdInObject(res);
  } catch (err) {
    console.error("Error fetching module:", err);
    return null;
  }
};
