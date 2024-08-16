import { db } from "@/backend/model";
import { replaceMongoIdInArray } from "@/lib/convertData";

export const getEnrollmentsForCourse = async (courseId: string) => {
  try {
    const enrollments = await db.enrollment.find({ course: courseId }).lean();
    return replaceMongoIdInArray(enrollments);
  } catch (err) {
    console.error("Error fetching enrollments: ", err);
    throw new Error("Failed to fetch enrollments");
  }
};
