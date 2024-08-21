import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/model";
import { ICourse, ITestimonial } from "@/interface/courses";

import {
  nestedReplaceMongoIdInArray,
  nestedReplaceMongoIdInObject,
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/convertData";
import { getEnrollmentsForCourse } from "./enrollments";
import { getTestimonialsForCourse } from "./testimonials";

export const getCourseList = async (): Promise<ICourse[]> => {
  try {
    await dbConnect();

    const courses = await db.course
      .find({})
      .select([
        "title",
        "subtitle",
        "thumbnail",
        "price",
        "category",
        "instructor",
        "testimonials",
        "modules",
      ])
      .populate({
        path: "category",
        model: db.category,
        select: "-__v",
      })
      .populate({
        path: "instructor",
        model: db.user,
        select: "-__v -password",
      })
      .populate({
        path: "testimonials",
        model: db.testimonial,
        select: "-__v",
      })
      .populate({
        path: "modules",
        model: db.module,
        select: "-__v",
      })
      .lean();

    return replaceMongoIdInArray(courses) as ICourse[];
  } catch (err) {
    console.error("Error fetching courses: ", err);
    throw new Error("Failed to fetch courses");
  }
};

export const getCourseDetails = async (id: string) => {
  const course = await db.course
    .findById(id)
    .populate({
      path: "category",
      model: db.category,
      select: "-__v",
    })
    .populate({
      path: "instructor",
      model: db.user,
      select: "-__v -password",
    })
    .populate({
      path: "testimonials",
      model: db.testimonial,
      populate: {
        path: "user",
        model: db.user,
      },
      select: "-__v",
    })
    .populate({
      path: "modules",
      model: db.module,
      select: "-__v",
    })
    .lean();

  return nestedReplaceMongoIdInObject(
    course as NonNullable<typeof course>
  ) as ICourse;
};

export const getCourseDetailsByInstructor = async (
  id: string,
  expand = false
) => {
  const courses = await db.course.find({ instructor: id }).lean();

  // Fetch enrollments and testimonials concurrently for each course
  const courseData = await Promise.all(
    courses.map(async (course) => {
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
    return {
      courses: nestedReplaceMongoIdInArray(courses?.flat()) as ICourse[],
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
  const totalRevenue: number = courses.reduce((acc, course) => {
    return (
      acc + (groupByCourses[course?._id.toString()]?.length || 0) * course.price
    );
  }, 0);

  return {
    courses: courses.length,
    enrollments: totalEnrollments,
    reviews: totalTestimonials.length,
    averageRating,
    revenue: totalRevenue,
  };
};

export const getInstructorCourses = async (id: string) => {
  try {
    const courses = await db.course.find({ instructor: id }).lean();

    return replaceMongoIdInArray(courses) as ICourse[];
  } catch (err) {
    console.error("Error fetching courses: ", err);
    throw new Error("Failed to fetch courses");
  }
};
