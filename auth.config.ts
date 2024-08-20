import { NextAuthConfig } from "next-auth";

export const authConfig : NextAuthConfig = {
    session: {
        strategy: "jwt",
    },
    trustHost: true,
    providers: []
}