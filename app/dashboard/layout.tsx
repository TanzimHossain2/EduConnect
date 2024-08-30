import { UserProvider } from "@/Providers/UserProvider";
import { Navbar } from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import { SessionProvider } from "next-auth/react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <SessionProvider>
      <div className="h-[80px] lg:pl-56 fixed inset-y-0 w-full z-50">
        <UserProvider>
        <Navbar />
        </UserProvider>
      </div>
      <div className="hidden lg:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="lg:pl-56 pt-[80px] h-full">{children}</main>
      </SessionProvider>
    </div>
  );
};
export default DashboardLayout;
