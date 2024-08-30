import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/model";
import { ICourse } from "@/interface/courses";

import {
  nestedReplaceMongoIdInArray,
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
    return [];
  }
};

export const getCourseDetails = async (id: string) => {
  try {
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
        populate: {
          path: "lessonIds",
          model: db.lesson,
        },
      })
      .lean();

    return nestedReplaceMongoIdInObject(
      course as NonNullable<typeof course>
    ) as ICourse;
  } catch (err) {
    console.error("Error fetching course details: ", err);

    return null;
  }
};

export const getCourseModulesDetails = async (id: string) => {
  try {
    const course = await db.course
      .findById(id)
      .populate({
        path: "modules",
        model: db.module,
        populate: {
          path: "lessonIds",
          model: db.lesson,
        },
      })
      .populate({
        path: "quizSet",
        model: db.quizSet,
        populate: {
          path: "quizIds",
          model: db.quiz,
        },
      })
      .lean();

    return nestedReplaceMongoIdInObject(
      course as NonNullable<typeof course>
    ) as ICourse;
  } catch (err) {
    console.error("Error fetching course modules details: ", err);
    return null;
  }
};

export const getFilterCourseList = async (
  search = "",
  category = "",
  price = "",
  sort = "",
  maxPrice = "",
  minPrice = ""
): Promise<ICourse[]> => {
  try {
    await dbConnect();

    const query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { subtitle: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        query.price.$lte = parseFloat(maxPrice);
      }
    }

    if (price) {
      query.price = price === "free" ? 0 : { $gt: 0 };
    }

    let sortQuery: any = {};

    if (sort) {
      const [field, order] = sort.split("-");
      sortQuery[field] = order === "asc" ? 1 : -1;
    }

    const courses = await db.course
      .find({ ...query, active: true })
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
      .sort(sortQuery)
      .lean();

    return replaceMongoIdInArray(courses) as ICourse[];
  } catch (err) {
    console.error("Error fetching courses: ", err);
    return [];
  }
};

/**
 *  Get course by category with filter
 * @param categoryId
 * @param filter  { search, sort, price, minPrice, maxPrice }
 * @returns  ICourse[]
 */
export const getCourseByCategory = async (categoryId: string, filter: any) => {
  try {
    await dbConnect();

    let query: any = {};

    if (filter.search) {
      query.$or = [
        { title: { $regex: filter.search, $options: "i" } },
        { subtitle: { $regex: filter.search, $options: "i" } },
        { tags: { $regex: filter.search, $options: "i" } },
      ];
    }

    if (categoryId) {
      query.category = categoryId;
    }

    if (filter.minPrice || filter.maxPrice) {
      query.price = {};
      if (filter.minPrice) {
        query.price.$gte = parseFloat(filter.minPrice);
      }
      if (filter.maxPrice) {
        query.price.$lte = parseFloat(filter.maxPrice);
      }
    }

    if (filter.price) {
      query.price = filter.price === "free" ? 0 : { $gt: 0 };
    }

    let sortQuery: any = {};

    if (filter.sort) {
      const [field, order] = filter.sort.split("-");
      sortQuery[field] = order === "asc" ? 1 : -1;
    }

    const courses = await db.course
      .find({ ...query, active: true })
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

      .sort(sortQuery)
      .lean();

    return nestedReplaceMongoIdInArray(courses) as ICourse[];
  } catch (error) {
    console.error("Error fetching courses by category: ", error);
    return {
      error: String(error),
      code: 500,
    };
  }
};

export const getRelatedCourses = async (tags: string[]) => {
  try {
    await dbConnect();

    const caseInsensitiveTags = tags.map((tag) => ({
      tags: { $regex: new RegExp(`^${tag}$`, "i") },
    }));

    const courses = await db.course
      .find({ $or: caseInsensitiveTags })
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
      })
      .lean();

    return replaceMongoIdInArray(courses) as ICourse[];
  } catch (error) {
    console.error("Error fetching related courses: ", error);
    return [];
  }
};
