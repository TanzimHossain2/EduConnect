import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/model";
import { LoginSchema } from "@/schema";
import { generateHash } from "@/utils/hasing";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

type ISchema = z.infer<typeof LoginSchema>;

export const POST = async (req: NextRequest, res: NextResponse) => {
  await dbConnect();

  const { first_name, last_name, email, password, userRole,phone } =
    (await req.json()) as ISchema;
  const hashedPassword = await generateHash(password);

  const newUser = {
    first_name,
    last_name,
    email,
    phone,
    password: hashedPassword,
    role: userRole,
  };

  console.log(newUser);

  try {
    await db.user.create(newUser);

    return new NextResponse("User created successfully", { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("An error occurred", { status: 500 });
  }
};