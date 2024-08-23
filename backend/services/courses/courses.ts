import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/model";
import { ICourse } from "@/interface/courses";

import {
  nestedReplaceMongoIdInObject,
  replaceMongoIdInArray,
} from "@/utils/convertData";

export const getCourseList = async (): Promise<ICourse[]> => {
  try {
    await dbConnect();

    const courses = await db.course
      .find({ active: true })
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
