/* 
    * This file is used to extend the NextAuth.js types to include custom properties that are not included in the default types.
    * This is useful for when you want to add custom properties to the user object or the JWT object. 
    @Learn more about this here: https://authjs.dev/getting-started/typescript
*/

import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser & DefaultSession["user"];
    accessToken: string | null;
    refreshToken: string | null;
    accessTokenExpires: number | null;
    error: "RefreshAccessTokenError" | null;
  }
}

import "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */

  interface JWT {
    accessToken: string | null;
    refreshToken: string | null;
    accessTokenExpires: number | null;
  }
}
