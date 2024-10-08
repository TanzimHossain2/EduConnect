import { db } from "@/backend/model";
import { IUser } from "@/interface/courses";
import { replaceMongoIdInObject } from "@/utils/convertData";


export  const  getUserByEmail = async (email: string)=> {

    if (!email) {
        return null;
    }

    const user = await db.user.findOne({ email }).lean();

    if (user) {
        return replaceMongoIdInObject(user) as IUser;
    } else {
        return null;
    }
}


export const getUserById = async (id : string) => {
    if (!id) {
        return null;
    }

    const user = await db.user.findById(id)
    .select("-password")
    .lean();

    if (user) {
        return replaceMongoIdInObject(user) as IUser;
    } else {
        return null;
    }
}


