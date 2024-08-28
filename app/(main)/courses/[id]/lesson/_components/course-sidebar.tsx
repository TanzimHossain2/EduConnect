import { getCourseModulesDetails } from "@/backend/services/courses/courses";
import { getWatchData } from "@/backend/services/lesson";
import CourseProgress from "@/components/course-progress";
import { useLoggedInUser } from "@/hooks/use-loggedIn-user";
import DownloadCertificate from "./download-certificate";
import GiveReview from "./give-review";
import SidebarModules from "./sidebar-modules";

export const CourseSidebar = async ({ courseId }: { courseId: string }) => {
  const res = await getCourseModulesDetails(courseId);
  const user = await useLoggedInUser();
  const userId = user?.id ?? "";

  if (!res) {
    return null;
  }

  const updatedModules = await Promise.all(
    res.modules.map(async (module) => {
      const moduleId = module.id;
      const lessons = module.lessonIds;

      const updatedLessons = await Promise.all(
        lessons.map(async (lesson) => {
          const lessonId = lesson.id;
          const watch = await getWatchData(lessonId, moduleId, userId);

          if (watch?.state === "completed") {
            lesson.state = "completed";
          }

          return lesson;
        })
      );

      return module;
    })
  );

  return (
    <>
      <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
        <div className="p-8 flex flex-col border-b">
          <h1 className="font-semibold">Reactive Accelerator</h1>

          <div className="mt-10">
            <CourseProgress variant="success" value={80} />
          </div>
        </div>

        <SidebarModules courseId={courseId} modules={updatedModules} />

        <div className="px-6 w-full">
          <DownloadCertificate courseId={courseId} />
          <GiveReview courseId={courseId} />
        </div>
      </div>
    </>
  );
};
