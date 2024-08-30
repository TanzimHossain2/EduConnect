import { auth } from "@/auth";
import { getCourseDetailsByInstructor } from "@/backend/services/courses";
import { getUserByEmail } from "@/backend/services/users";
import { IEnrollment, ITestimonial } from "@/interface/courses";
import { populateEnrollmentData, populateReviewData } from "@/lib/populateData";

export const COURSE_DATA: string = "course";
export const ENROLLMENT_DATA: string = "enrollment";
export const REVIEW_DATA: string = "review";
export const DEFAULT_DATA: string = "default";
export const INSTRUCTOR_DATA: string = "instructor";

type IDataType =
  | typeof COURSE_DATA
  | typeof ENROLLMENT_DATA
  | typeof REVIEW_DATA
  | typeof DEFAULT_DATA;

export const getInstructorData = async (dataType: IDataType = DEFAULT_DATA) => {
  try {
    const session = await auth();

    if (!session?.user) {
      return null;
    }

    const instructor = await getUserByEmail(session?.user?.email ?? "");

    if (!instructor) {
      return null;
    }

    const data = await getCourseDetailsByInstructor(instructor?.id, true);

    if (!data) {
      return null;
    }

    switch (dataType) {
      case COURSE_DATA:
        return data?.courses;
      case ENROLLMENT_DATA:
        return populateEnrollmentData(data?.enrollments as IEnrollment[]);
      case REVIEW_DATA:
        return populateReviewData(data?.reviews as ITestimonial[]);
      case INSTRUCTOR_DATA:
        return instructor;
      default:
        return data;
    }
  } catch (err) {
    console.error("Error fetching instructor data: ", err);
    throw new Error("Failed to fetch instructor data");
  }
};
