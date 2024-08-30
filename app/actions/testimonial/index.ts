"use server";

import { db } from "@/backend/model"
import { getLoggedInUser } from "@/lib/loggedin-user"
import * as z from "zod"
import { revalidatePath } from 'next/cache'

const addTestimonialSchema = z.object({
    rating: z.number().min(1).max(5),
    content: z.string().min(1)
})


export const addTestimonial = async (courseId:string ,data: any) => {
    try {
        const loggedInUser = await getLoggedInUser();

        if (!loggedInUser) {
            throw new Error("User not found");
        }

        const perseData = addTestimonialSchema.parse(data);

        const testimonial = new db.testimonial({
            ...perseData,
            user: loggedInUser.id,
            courseId
        })

        await testimonial.save(); 

        // insert the new review in the course
        await db.course.updateOne({
            _id: courseId
        }, {
            $push: {
                testimonials: testimonial._id
            }
        })


        return {
            code: 200,  
            message: "Review added"
        }

    } catch (err) {
        console.log("Error in addTestimonial", err); 
        
         return {
            code: 500,  
            error: err instanceof Error ? err.message  : "Something went wrong"
         }
    }
}


export const UpdateTestimonial = async (testimonialId:string ,data: any) => {
    try {
        const loggedInUser = await getLoggedInUser();

        if (!loggedInUser) {
            throw new Error("User not found");
        }

        const perseData = addTestimonialSchema.parse(data);

        const testimonial = await db.testimonial.findOne({
            _id: testimonialId,
            user: loggedInUser.id
        })

        if (!testimonial) {
            throw new Error("Testimonial not found");
        }

        testimonial.rating = perseData.rating;
        testimonial.content = perseData.content;

        await testimonial.save(); 

        // console.log(`/courses/${testimonial.courseId}/lesson`);
        

        revalidatePath(`/(main)/courses/[id]/lesson`, 'page')

        return {
            code: 200,  
            message: "Review updated"
        }

    } catch (err) {
        console.log("Error in UpdateTestimonial", err); 
        
         return {
            code: 500,  
            error: err instanceof Error ? err.message  : "Something went wrong"
         }
    }
}