import { db } from "@/backend/model";

export const create = async (courseData:any) => {
    try {
        const course = await db.course.create(courseData);
        return JSON.parse(JSON.stringify(course));
        
    } catch (err) {
        throw new Error(err as any);
    }
}