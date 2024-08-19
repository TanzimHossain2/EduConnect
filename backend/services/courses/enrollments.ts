import { db } from "@/backend/model";
import { IEnrollment } from "@/interface/courses";
import { replaceMongoIdInArray } from "@/utils/convertData";
import { Types } from "mongoose";

export const getEnrollmentsForCourse = async (courseId: string) => {
  try {
    const enrollments = await db.enrollment.find({ course: courseId }).lean();
    return replaceMongoIdInArray(enrollments);
  } catch (err) {
    console.error("Error fetching enrollments: ", err);
    throw new Error("Failed to fetch enrollments");
  }
};

export const enrollForCourse = async (
  courseId: string,
  userId: string,
  paymentMethod: string
) => {

  if (!courseId || !userId || !paymentMethod) {
    throw new Error("Please provide all required fields");
  }


  const newEnrollment = {
    course: new Types.ObjectId(courseId),
    student: new Types.ObjectId(userId),
    enrollment_date: new Date(),
    method: paymentMethod,
    status: "not-started",
  };

  try {
    const response = await db.enrollment.create(newEnrollment);
    return response;
  } catch (err) {
    console.error("Error enrolling for course: ", err);
    throw new Error("Failed to enroll for course");
  }
};
