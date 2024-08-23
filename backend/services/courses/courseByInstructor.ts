import { db } from "@/backend/model";
import { ICourse, ITestimonial } from "@/interface/courses";
import {
  nestedReplaceMongoIdInArray,
  replaceMongoIdInArray,
} from "@/utils/convertData";
import { getEnrollmentsForCourse } from "./enrollments";
import { getTestimonialsForCourse } from "./testimonials";

export const getInstructorCourses = async (id: string) => {
    try {
      const courses = await db.course.find({ instructor: id }).lean();
  
      return replaceMongoIdInArray(courses) as ICourse[];
    } catch (err) {
      console.error("Error fetching courses: ", err);
      throw new Error("Failed to fetch courses");
    }
  };
  

// this function is used to get the course details by instructor
export const getCourseDetailsByInstructor = async (
  id: string,
  expand = false
) => {
  const publishedCourses = await db.course.find({ instructor: id, active: true }).lean();

  // Fetch enrollments and testimonials concurrently for each course
  const courseData = await Promise.all(
    publishedCourses.map(async (course) => {
      const [enrollments, testimonials] = await Promise.all([
        getEnrollmentsForCourse(course._id.toString()),
        getTestimonialsForCourse(course._id.toString()),
      ]);
      return { enrollments, testimonials };
    })
  );

  const enrollments = courseData.map((data) => data.enrollments);
  const testimonials = courseData.map((data) => data.testimonials);

  const totalTestimonials = testimonials.flat() as ITestimonial[];

  if (expand) {

    const allCourses = await db.course.find({ instructor: id }).lean();
  

    return {
      courses: nestedReplaceMongoIdInArray(allCourses?.flat()) as ICourse[],
      enrollments: nestedReplaceMongoIdInArray(enrollments?.flat()),
      reviews: nestedReplaceMongoIdInArray(totalTestimonials),
    };
  }

  // Calculate total enrollments
  const totalEnrollments = enrollments.reduce(
    (acc, val) => acc + val.length,
    0
  );

  // Calculate average rating
  const averageRating =
    totalTestimonials.length > 0
      ? (
          totalTestimonials.reduce((acc, val) => acc + val.rating, 0) /
          totalTestimonials.length
        ).toPrecision(2)
      : "N/A";

  // Group enrollments by course
  const groupByCourses = Object.groupBy(enrollments.flat(), ({ course }) =>
    course.toString()
  );

  // Calculate total revenue
  const totalRevenue: number = publishedCourses.reduce((acc, course) => {
    return (
      acc + (groupByCourses[course?._id.toString()]?.length || 0) * course.price
    );
  }, 0);

  return {
    courses: publishedCourses.length,
    enrollments: totalEnrollments,
    reviews: totalTestimonials.length,
    averageRating,
    revenue: totalRevenue,
  };
};

