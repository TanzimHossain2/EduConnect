"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

import { MobileNav } from "@/components/mobile-nav";
import { Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Logo } from "./logo";
import NavAvatar from "./nav-avatar";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useUser } from "@/hooks/useUser";


export function MainNav({
  items,
  children,
}: {
  items: { title: string; href: string; disabled?: boolean }[];
  children?: React.ReactNode;
}) {
  const { user } = useUser();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [loginSession, setLoginSession] = useState<any>(null);

  const { data: session } = useSession();

  if (session?.error === "RefreshAccessTokenError") {
    redirect("/login");
  }

  useEffect(() => {
    if (session) {
      setLoginSession(session);
    }
  }, [session]);

  return (
    <>
      <div className="flex gap-6 lg:gap-10">
        <Link href="/">
          <Logo />
        </Link>
        {items?.length ? (
          <nav className="hidden gap-6 lg:flex">
            {items?.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        ) : null}

        {showMobileMenu && items && (
          <MobileNav items={items}>{children}</MobileNav>
        )}
      </div>
      <nav className="flex items-center gap-3">
        {!loginSession && (
          <div className="items-center gap-3 hidden lg:flex">
            <Link
              href="/login"
              className={cn(buttonVariants({ size: "sm" }), "px-4")}
            >
              Login
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Register
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-4">
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/register/student">Student</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/register/instructor">Instructor</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              <NavAvatar />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 mt-4">

            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href="/account">Profile</Link>
            </DropdownMenuItem>

           {
            user && user.role === "instructor" && (
              <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            )
           }


            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href="/account/enrolled-courses">My Courses</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href="">Testimonials & Certificates</Link>
            </DropdownMenuItem>
            {loginSession && (
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="#" onClick={() => signOut()}>
                  Logout
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          className="flex items-center space-x-2 lg:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <X /> : <Menu />}
        </button>
      </nav>
    </>
  );
}
