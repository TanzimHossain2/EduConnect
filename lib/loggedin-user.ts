import "server-only";

import { auth } from "@/auth";
import { getUserByEmail } from "@/backend/services/users";

export const getLoggedInUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const loggedInUser = await getUserByEmail(session?.user?.email ?? "");

  return loggedInUser;
};