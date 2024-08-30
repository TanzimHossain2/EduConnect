
import { dbConnect } from "@/backend/db/connectDb";
import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/backend/services/users";

export const GET = async (req: NextRequest) => {
    await dbConnect();
    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email");
    
    if (!email) {
        return new NextResponse("Email is required", { status: 400 });
    }
    
    const user = await getUserByEmail(email as string);

    const newUser = {
        firstName : user?.firstName,
        lastName : user?.lastName,
        profilePicture : user?.profilePicture,
        role: user?.role,
    }

    if (user) {
        return new NextResponse(JSON.stringify(newUser), { status: 200 });
    } else {
        return new NextResponse("User not found", { status: 404 });
    }
}

