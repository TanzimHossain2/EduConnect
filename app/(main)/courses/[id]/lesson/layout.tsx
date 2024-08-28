import { useLoggedInUser } from "@/hooks/use-loggedIn-user";
import { CourseSidebar } from "./_components/course-sidebar";
import { CourseSidebarMobile } from "./_components/course-sidebar-mobile";

import { hasEnrollmentForCourse } from "@/backend/services/courses";
import { redirect } from "next/navigation";

type CourseLayoutProps = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};

const CourseLayout = async ({
  children,
  params: { id },
}: CourseLayoutProps) => {
  const loggedUser = await useLoggedInUser();

  if (!loggedUser) {
    redirect("/login");
  }

  const hasEnrollment = await hasEnrollmentForCourse(id, loggedUser.id);

  if (!hasEnrollment) {
    redirect("/courses?error=You are not enrolled in this course");
  }

  return (
    <div className="">
      <div className="h-[80px] lg:pl-96 fixed top-[60px] inset-y-0 w-full z-10">
        <div className="flex lg:hidden p-4 border-b h-full items-center bg-white shadow-sm relative">
          <CourseSidebarMobile courseId={id} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="hidden lg:flex h-full w-96 flex-col inset-y-0 z-50">
          <CourseSidebar courseId={id} />
        </div>
        <main className="lg:pl-96 pt-[80px] lg:pt-[20px] h-full col-span-10 px-4">
          {children}
        </main>
      </div>
    </div>
  );
};
export default CourseLayout;
