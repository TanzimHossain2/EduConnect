import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/model";
import { ICourse } from "@/interface/courses";
import {
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

  return replaceMongoIdInObject(course as NonNullable<typeof course>);
};

export const getCourseDetailsByInstructor = async (id: string) => {
  const courses = await db.course.find({ instructor: id }).lean();

  const enrollments = await Promise.all(
    courses.map(async (course) => {
      const enrollments = await getEnrollmentsForCourse(course._id.toString());
      return enrollments;
    })
  );

  const testimonials = await Promise.all(
    courses.map(async (course) => {
      const testimonials = await getTestimonialsForCourse(
        course._id.toString()
      );
      return testimonials;
    })
  );

  const totalEnrollments = enrollments.reduce(
    (acc, val) => acc + val.length,
    0
  );
  const totalTestimonials = testimonials.flat();
  const averageRating =
    totalTestimonials.reduce((acc, val) => acc + val.rating, 0) /
    totalTestimonials.length;

  return {
    courses: courses.length,
    enrollments: totalEnrollments,
    reviews: totalTestimonials.length,
    averageRating: averageRating.toPrecision(2),
  };
};
