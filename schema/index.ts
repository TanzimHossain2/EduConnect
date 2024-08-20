import * as z from "zod";

export const LoginSchema = z.object({
    firstName: z.string().min(2).max(255),
    lastName: z.string().min(2).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(255),
    phone: z.string().min(10).max(13),
    confirmPassword: z.string().min(6).max(255),
    userRole: z.enum(["student", "instructor"]),
})

