import { db } from "@/backend/model";
import { replaceMongoIdInArray } from "@/lib/convertData";

export const getTestimonialsForCourse = async (courseId: string) => {
  try {
    const testimonials = await db.testimonial
      .find({ courseId: courseId })
      .lean();

    return replaceMongoIdInArray(testimonials);
  } catch (err) {
    console.error("Error fetching testimonials: ", err);
    throw new Error("Failed to fetch testimonials");
  }
};
