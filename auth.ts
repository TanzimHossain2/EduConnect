import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import { db } from "./backend/model";
import { hashMatched } from "./utils/hasing";

async function refreshAccessToken(token: any) {
  try {
    const url = `https://oauth2.googleapis.com/token`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.AUTH_GOOGLE_ID || "",
        client_secret: process.env.AUTH_GOOGLE_SECRET || "",
        refresh_token: token.refreshToken,
        grant_type: "refresh_token",
      }).toString(),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens?.access_token,
      accessTokenExpires: Date.now() + refreshedTokens?.expires_in * 1000,
      refreshToken: refreshedTokens?.refresh_token,
    };
  } catch (err) {
    console.log("Error refreshing access token", err);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,

  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
        },
      },
    }),

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

            if (isMatch) {
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

  // callbacks: {
  //   async jwt({ token, user, account }) {
  //     if (account && user) {
  //       return {
  //         accessToken: account?.access_token,
  //         accessTokenExpires: account?.expires_in
  //           ? Date.now() + account.expires_in * 1000
  //           : 0,
  //         refreshToken: account?.refresh_token,
  //         user,
  //       };
  //     }

  //     if (Date.now() < (token?.accessTokenExpires as number)) {
  //       return token;
  //     }

  //     return refreshAccessToken(token);
  //   },

  //   async session({ session, token }) {
  //     session.accessToken = token?.accessToken;
  //     session.user = token?.user as any;
  //     session.error = token?.error as "RefreshAccessTokenError" | null;

  //     return session;
  //   },
  // },

});
