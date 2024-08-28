import { db } from "@/backend/model";
import { IEnrollment } from "@/interface/courses";
import {
  nestedReplaceMongoIdInArray,
  replaceMongoIdInArray,
} from "@/utils/convertData";
import { Types } from "mongoose";

export const getEnrollmentsForCourse = async (
  courseId: string
): Promise<IEnrollment[]> => {
  try {
    const enrollments = await db.enrollment.find({ course: courseId }).lean();
    return replaceMongoIdInArray(enrollments) as IEnrollment[];
  } catch (err) {
    console.error("Error fetching enrollments: ", err);
    throw new Error("Failed to fetch enrollments");
  }
};

export const enrollForCourse = async (
  courseId: string,
  userId: string,
  paymentMethod: string
): Promise<IEnrollment> => {
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

export const getEnrollmentsForUser = async (userId: string) => {
  try {
    const enrollments = await db.enrollment
      .find({ student: userId })
      .populate({
        path: "course",
        model: db.course,
        populate: {
          path: "category",
          model: db.category,
        },
      })
      .lean();
    return nestedReplaceMongoIdInArray(enrollments) as IEnrollment[];
  } catch (err) {
    console.error("Error fetching enrollments: ", err);
    throw new Error("Failed to fetch enrollments");
  }
};

/**
 *  Check if a student has enrollment for a course 
 * @param courseId 
 * @param studentId 
 * @returns  boolean
 */
export const hasEnrollmentForCourse = async (
  courseId: string,
  studentId: string
) => {
  if (!courseId || !studentId) {
    return false;
  }

  try {
    const enrollment = await db.enrollment
      .findOne({
        course: courseId,
        student: studentId,
      })
      .lean();

    if (!enrollment) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.error("Error fetching enrollments: ", err);
    throw new Error("Failed to fetch enrollments");
  }
};
