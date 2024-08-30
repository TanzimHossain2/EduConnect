

import { auth } from "@/auth";
import { getUserByEmail } from "@/backend/services/users";

export const useLoggedInUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const LoggedInUser = await getUserByEmail(session?.user?.email ?? "");

  return LoggedInUser;
};