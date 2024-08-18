import NextAuth from "next-auth";

import CredentialProvider from "next-auth/providers/credentials";
import { db } from "./backend/model";
import { hashMatched } from "./utils/hasing";
import { authConfig } from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,

  providers: [
    CredentialProvider({

      async authorize(credentials): Promise<any> {
        if (credentials == null) {
          return null;
        }

        try {
          const user = await db.user.findOne({
            email: credentials.email,
          });
   
          if (user) {
            const isMatch = await hashMatched(
                credentials.password as string,
                user.password 
            );

            if(isMatch) {
              return user;
            } else {
                throw new Error("Invalid credentials");
            }

          } else {
            throw new Error("User not found");
          }
        } catch (error) {}
      },
    }),
  ],
});
