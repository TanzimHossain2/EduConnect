import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IModule } from "@/interface/courses";
import { Video } from "lucide-react";
import CourseLessonList from "./CourseLessonList";

interface Props {
  module: IModule;
}

const CourseModuleList: React.FC<Props> = ({ module }) => {
  const totalDuration = module?.lessonIds.reduce(
    (acc, lesson) => acc + lesson.duration,
    0
  );

  return (
    <>
      <AccordionItem className="border-none" value="item-1">
        <AccordionTrigger>{module?.title}</AccordionTrigger>
        <AccordionContent>
          {/* header */}
          <div className="flex gap-x-5 items-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
            <span className="flex items-center gap-1.5">
              <Video className="w-4 h-4" />
              {(totalDuration / 3600).toPrecision(2)} Hours
            </span>
          </div>
          {/* header ends */}

          <div className="space-y-3">
            {module?.lessonIds &&
              module?.lessonIds.length > 0 &&
              module?.lessonIds.map((lesson, index) => (
                <CourseLessonList
                  key={`${lesson.id}-${index}`}
                  lesson={lesson}
                />
              ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  );
};

export default CourseModuleList;
