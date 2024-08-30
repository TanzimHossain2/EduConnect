import { getCourseModulesDetails } from "@/backend/services/courses/courses";
import { getWatchData } from "@/backend/services/lesson";
import CourseProgress from "@/components/course-progress";
import { useLoggedInUser } from "@/hooks/use-loggedIn-user";
import DownloadCertificate from "./download-certificate";
import GiveReview from "./give-review";
import SidebarModules from "./sidebar-modules";
import { getAReport } from "@/backend/services/courses";
import Quiz from "./quiz";
import { IQuizSet } from "@/interface/courses";

export const CourseSidebar = async ({ courseId }: { courseId: string }) => {
  const course = await getCourseModulesDetails(courseId);
  const user = await useLoggedInUser();
  const userId = user?.id ?? "";

  if (!course) {
    return null;
  }

  const report = await getAReport({ course: courseId, student: userId });

  const updatedModules = await Promise.all(
    course.modules.map(async (module) => {
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

  const totalCompletedLessons = report?.totalCompletedModules ? report?.totalCompletedModules.length : 0;
  const totalModules = course?.modules ? course.modules.length : 0;
  const totalProgress = (totalModules > 0) ? (totalCompletedLessons / totalModules) * 100 : 0;

  const quizSet = course?.quizSet as unknown as IQuizSet;
  const isQuizComplete = report?.quizAssessment ? true : false;

  return (
    <>
      <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
        <div className="p-8 flex flex-col border-b">
          <h1 className="font-semibold">Reactive Accelerator</h1>

          <div className="mt-10">
            <CourseProgress variant="success" value={totalProgress} />
          </div>
        </div>

        <SidebarModules courseId={courseId} modules={updatedModules} />

     <div className="w-full px-4 lg:px-14 pt-10 border-t">
     {quizSet && <Quiz courseId={courseId} quizSet={quizSet} isTaken={isQuizComplete}  />}
     </div>

        <div className="px-6 w-full">
          <DownloadCertificate courseId={courseId} totalProgress={totalProgress} />
          <GiveReview courseId={courseId} />
        </div>
      </div>
    </>
  );
};
