import { auth } from "@/auth";
import { db } from "@/backend/model";
import { getCourseDetailsByInstructor } from "@/backend/services/courses";
import { getUserByEmail, getUserById } from "@/backend/services/users";
import { ITestimonial } from "@/interface/courses";
import { nestedReplaceMongoIdInArray } from "@/utils/convertData";

export const COURSE_DATA: string = "course";
export const ENROLLMENT_DATA: string = "enrollment";
export const REVIEW_DATA: string = "review";
export const DEFAULT_DATA: string = "default";
export const INSTRUCTOR_DATA: string = "instructor";

type IDataType = typeof COURSE_DATA | typeof ENROLLMENT_DATA | typeof REVIEW_DATA | typeof DEFAULT_DATA;

export const useInstructorData = async (dataType: IDataType = DEFAULT_DATA) => {
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
        return data?.enrollments;
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


const populateReviewData = async (reviews: ITestimonial[] ) => {
 const populatedReviewData = await Promise.all(reviews.map(async (review) => {
    const student = await getUserById(review?.user as unknown as string);
  
    review["studentName"] = `${student?.firstName} ${student?.lastName}`;
    return review;
  }

  ));


  return populatedReviewData as ITestimonial[];


}