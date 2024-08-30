import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/model";
import { nestedReplaceMongoIdInObject, replaceMongoIdInArray } from "@/utils/convertData";

export async function getCategories() {
 await dbConnect ();
  try {
    const categories = await db.category.find({}).lean();

    return replaceMongoIdInArray(categories);
  } catch (error) {
    console.error("Error fetching categories: ", error);
    throw new Error(String(error))
  }
}


export async function getCategoryDetails(categoryId: string) {
  try {
    const category = await db.category.findById(categoryId).lean();

    if (category === null) {
      return null; 
    }

    return nestedReplaceMongoIdInObject(category);
  } catch (error) {
    console.error("Error fetching category details: ", error);
    throw new Error(String(error))
  }
}
