"use client";

import { UserContext } from "@/context";
import { useCurrentUser } from "@/hooks/use-current-user";
import React, { useEffect, useState } from "react";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const CurrentUser = useCurrentUser();
  const email = CurrentUser?.email || "";

  useEffect(() => {
    let isMounted = true;
    if (!email) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user?email=${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch user data: ${res.statusText}`);
        }

        const data = await res.json();

        if (isMounted) {
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [email]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
