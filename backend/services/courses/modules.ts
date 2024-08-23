import { db } from "@/backend/model";

export const createModule = async (moduleData: any) => {
  try {
    const res = await db.module.create(moduleData);
    return JSON.parse(JSON.stringify(res));
  } catch (err) {
    throw new Error(err as any);
  }
};
