import { getCategories, getCourseDetails } from "@/backend/services/courses";
import AlertBanner from "@/components/alert-banner";
import { IconBadge } from "@/components/icon-badge";
import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react";
import { CategoryForm } from "./_components/category-form";
import { CourseActions } from "./_components/course-action";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { ModulesForm } from "./_components/module-form";
import { PriceForm } from "./_components/price-form";
import { QuizSetForm } from "./_components/quiz-set-form";
import { TitleForm } from "./_components/title-form";

interface Params {
  params: {
    courseId: string;
  };
}

const EditCoursePage = async ({ params: { courseId } }: Params) => {
  const course = await getCourseDetails(courseId);
  const categories = await getCategories();

  const mappedCategories = categories.map((c) => {
    return {
      value: c.id,
      label: c.title,
      id: c.id,
    };
  });

  const modules = course?.modules.sort((a, b) => a.order - b.order);

  return (
    <>
      {!course?.active && (
        <AlertBanner
          label="This course is unpublished. It will not be visible in the course."
          variant="warning"
          className=""
        />
      )}

      <div className="p-6">
        <div className="flex items-center justify-end">
          <CourseActions courseId={courseId} isActive={course?.active} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge
                icon={LayoutDashboard}
                variant="default"
                size="default"
              />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm
              initialData={{
                title: course?.title,
              }}
              courseId={courseId}
            />
            <DescriptionForm
              initialData={{
                description: course?.description,
              }}
              courseId={courseId}
            />

            <ImageForm
              initialData={{
                imageUrl: `/assets/images/courses/${course?.thumbnail}` || "",
              }}
              courseId={courseId}
            />

            <CategoryForm
              initialData={{
                value: course?.category?.title,
              }}
              courseId={courseId}
              options={mappedCategories}
            />

            <QuizSetForm initialData={{}} courseId={courseId} />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2 mb-6">
                <IconBadge icon={ListChecks} variant="default" size="default" />
                <h2 className="text-xl">Course Modules</h2>
              </div>

              <ModulesForm initialData={modules} courseId={courseId} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge
                  icon={CircleDollarSign}
                  variant="default"
                  size="sm"
                />
                <h2 className="text-xl">Sell you course</h2>
              </div>
              <PriceForm
                initialData={{
                  price: course?.price,
                }}
                courseId={courseId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditCoursePage;
