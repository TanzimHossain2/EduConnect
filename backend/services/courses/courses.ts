import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/model";
import { ICourse } from "@/interface/courses";

export const getCourses = async () : Promise<ICourse[]> =>{
  try {
    await dbConnect();

    const courses = await db.course.find({}).populate({
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


    return courses; 

  } catch (err) {
    console.error("Error fetching courses: ", err);
    throw new Error("Failed to fetch courses");
  }
};
