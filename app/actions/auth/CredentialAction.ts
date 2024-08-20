"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
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
      email: email.toLowerCase(),
      password,
      redirect: false,
    });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("ZodError----", error);
      return { error: error.errors[0].message };
    } else if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          console.log("CredentialsSignin Login Error:- ", error);
          return {
            error: "Invalid Credentials!",
          };
        }

        default: {
          console.log("Default Login Error:- ", error);
          return {
            error: "Something went wrong!",
          };
        }
      }
    }

    return { error: (error as any).message };
  }
};
