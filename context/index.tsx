"use client";

import { createContext } from "react";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  role: "admin" | "instructor" | "student";
}

interface UserContextType {
  user: User | null;
  setUser: (user: any) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
