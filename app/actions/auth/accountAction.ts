"use server";

import { db } from "@/backend/model";
import { nestedSanitizeData } from "@/utils/sanitizeData";
import { revalidatePath } from "next/cache";

export const updateUserInfo = async (email: string, data:Object) => {
    try {
        const filter = { email: email }; 

        const updated = await db.user.findOneAndUpdate(filter, data);

        revalidatePath("/account");

        return {
            message: "User info updated successfully",
            code : 200,
        }
        
    } catch (err: any) {
       return {error: err.message} 
    }
}


interface IData {
    phone: string;
    socialMedia: {
        twitter?: string;
        linkedin?: string;
        facebook?: string;
        website?: string;
    };
}

export const updateContactInfo = async (email: string, data:IData) => {

    const SanitizeData  = nestedSanitizeData(data) as IData;

    try {
        
        const filter = { email: email }; 

        const updated = await db.user.findOneAndUpdate(filter, SanitizeData);  
        
        if (!updated) {
            return {
                error: "User not found",
                code: 404,
            }
        }

        revalidatePath("/account");

        return {
            message: "Contact info updated successfully",
            code : 200,
        }
        
    } catch (err:any) {
        return {error: err.message} 
    }
    
}
