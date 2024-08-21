"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/useUser";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { MobileSidebar } from "./mobile-sidebar";
import { LogOut } from "lucide-react";

export const Navbar = () => {
  const { user } = useUser();

  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <div className="flex items-center justify-end  w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              <Avatar>
                <AvatarImage
                  src={user?.profilePicture || "https://github.com/shadcn.png"}
                  alt={user?.firstName}
                />
                <AvatarFallback>{user?.firstName.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-4">
            <DropdownMenuItem className="cursor-pointer">
              <Link href="#" onClick={() => signOut()}>
                <span>
                  <LogOut size={14} />
                  Logout
                </span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
