import { AccordionContent } from "@/components/ui/accordion";
import SidebarLessonItem from "./sidebar-lesson-items";
import { ILesson } from "@/interface/courses";

interface SidebarLessonsProps {
  courseId: string;
  lessons: ILesson[];
  moduleSlug: string;
}

const SidebarLessons = ({
  courseId,
  lessons,
  moduleSlug,
}: SidebarLessonsProps) => {
  const allLessons = lessons.toSorted(
    (a: { order: number }, b: { order: number }) => a.order - b.order
  );

  return (
    <>
      <AccordionContent>
        <div className="flex flex-col w-full gap-3">
          {allLessons &&
            allLessons.length > 0 &&
            allLessons.map((lesson, index) => {
              return (
                <SidebarLessonItem
                  courseId={courseId}
                  lesson={lesson}
                  moduleSlug={moduleSlug}
                  key={lesson.id + index}
                />
              );
            })}
        </div>
      </AccordionContent>
    </>
  );
};

export default SidebarLessons;
