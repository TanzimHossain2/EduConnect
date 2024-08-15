import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/model";
import { ICourse } from "@/interface/courses";
import { replaceMongoIdInArray } from "@/lib/convertData";

export const getCourseList = async () : Promise<ICourse[]> =>{
  try {
    await dbConnect();

    const courses = await db.course.find({})
    .select(["title","subtitle","thumbnail","price","category","instructor","testimonials","modules"])
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
    }).lean();


    return replaceMongoIdInArray(courses); 

  } catch (err) {
    console.error("Error fetching courses: ", err);
    throw new Error("Failed to fetch courses");
  }
};
