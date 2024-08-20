import { useUser } from "@/hooks/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const NavAvatar = () => {
  const { user } = useUser();

  return (
    <Avatar>
      <AvatarImage
        src={user?.profilePicture || "https://github.com/shadcn.png"}
        alt={user?.firstName || "User profile picture"}
      />
      <AvatarFallback>{user?.firstName.charAt(1) || "CN"}</AvatarFallback>
    </Avatar>
  );
};

export default NavAvatar;
