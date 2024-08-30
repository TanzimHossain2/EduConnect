import { createCertificate } from "@/backend/lib";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic"

export const GET = async (req: NextRequest) => {
  try {
    // const searchParams = req.nextUrl.searchParams;
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId") as string;

    const loggedInUser = await getLoggedInUser();

    if (!loggedInUser) {
      return new NextResponse("You are not logged in", { status: 401 });
    }

    const res = await createCertificate({ courseId, loggedInUser });

    if (res.status === 500) {
      return new NextResponse(res.message, { status: 500 });
    }

    return new Response(res.data, {
      headers: { "content-type": "application/pdf" },
    });
    
  } catch (err) {
    console.error("Error fetching courses: ", err);
    return new NextResponse("Something went wrong", { status: 500 });
  }
};
