import { getModuleById } from "@/backend/services/courses";
import AlertBanner from "@/components/alert-banner";
import { IconBadge } from "@/components/icon-badge";
import { ArrowLeft, BookOpenCheck, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CourseActions } from "../../_components/course-action";
import { LessonForm } from "./_components/lesson-form";
import { ModuleTitleForm } from "./_components/module-title-form";
import ModuleActions from "./_components/module-action";
import { IModule } from "@/interface/courses";

const Module = async ({ params }: any) => {
  const { courseId, moduleId } = params;
  const moduleData = await getModuleById(moduleId) as IModule;

  if (!moduleData) {
    redirect(`/dashboard/courses/${courseId}`);
  }

  const lessons =
    (moduleData?.lessonIds).sort((a: any, b: any) => a.order - b.order) || [];

  return (
    <>
      {
        !moduleData?.active &&
        (<AlertBanner
          className="mb-6"
          label="This module is unpublished. It will not be visible in the course."
          variant="warning"
        />)
      }

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/dashboard/courses/${courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-end">
              <ModuleActions courseId={courseId} moduleData={moduleData} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize Your module</h2>
              </div>
              <ModuleTitleForm
                initialData={{
                  title: moduleData?.title,
                }}
                courseId={courseId}
                chapterId={moduleId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={BookOpenCheck} />
                <h2 className="text-xl">Module Lessons</h2>
              </div>
              <LessonForm initialData={lessons} moduleId={moduleId} courseId={courseId} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              {/* <IconBadge icon={Video} />
              <h2 className="text-xl">Add a video</h2> */}
            </div>
            {/* <ChapterVideoForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Module;
