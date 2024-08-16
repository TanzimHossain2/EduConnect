import { db } from "@/backend/model";
import { replaceMongoIdInArray } from "@/lib/convertData";

export async function getCategories(){
    const categories = await db.category.find({}).lean();
    return replaceMongoIdInArray(categories);
}