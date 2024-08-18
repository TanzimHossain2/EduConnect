"use server";

import { signIn } from "@/auth";
import * as z from "zod";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

type IReturn = {
  error?: string;
  response?: any;
};

export const credentialLogin = async (formData: FormData): Promise<IReturn> => {
  try {

    const { email, password } = schema.parse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    const response = await signIn("credentials", {
        email,
        password,
      redirect: false,
    });

    return response;
  } catch (error) {

    console.error("Error logging in", error);

    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }

    return { error: (error as any).message };
  }
};
