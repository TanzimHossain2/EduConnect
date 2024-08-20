import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import { UserProvider } from "@/Providers/UserProvider";
const navLinks = [
  {
    title: "Features",
    href: "/#features",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Documentation",
    href: "/docs",
  },
];

import { SessionProvider } from "next-auth/react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <SessionProvider>
        <UserProvider>
          <header className="z-40 bg-background/60 backdrop-blur-md fixed top-0 left-0 right-0 border-b ">
            <div className="container flex h-20 items-center justify-between py-6 ">
              <MainNav items={navLinks} />
            </div>
          </header>
          <main className="flex-1 pt-20 flex flex-col">{children}</main>
          <SiteFooter />
        </UserProvider>
      </SessionProvider>
    </div>
  );
};
export default MainLayout;
