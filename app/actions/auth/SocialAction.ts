"use server";
import {signIn} from "@/auth"

export const doSocialLogin = async (formData: FormData)=>{
    const action = formData.get("action") as string;
    const res = await  signIn(action, {redirectTo: "/courses"});
}