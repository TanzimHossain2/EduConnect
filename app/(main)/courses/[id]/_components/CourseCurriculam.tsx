import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ICourse } from "@/interface/courses";
import { cn } from "@/lib/utils";
import {
  BookCheck,
  Clock10,
  FileQuestion,
  NotepadText,
  Radio,
  StickyNote,
  Tv,
  Video,
} from "lucide-react";
import CourseModuleList from "./module/CourseModuleList";

interface Props {
  course: ICourse;
}

const CourseCurriculam: React.FC<Props> = ({ course }) => {
  const totalDuration = course?.modules?.reduce(
    (acc, obj) => acc + obj.duration,
    0
  );

  return (
    <>
      <div className="flex gap-x-5 items-center justify-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
        <span className="flex items-center gap-1.5">
          <BookCheck className="w-4 h-4" />
          {course?.modules?.length} Chapters
        </span>
        <span className="flex items-center gap-1.5">
          <Clock10 className="w-4 h-4" />
          {(totalDuration / 60).toPrecision(2)}+ Hours
        </span>

        {/* <span className="flex items-center gap-1.5">
          <Radio className="w-4 h-4" />4 Live Class
        </span> */}
      </div>

      {/* contents */}
      <Accordion
        defaultValue={["item-1", "item-2", "item-3"]}
        type="multiple"
        className="w-full"
      >
        {course?.modules &&
          course?.modules.map((module) => {
            return (
              <CourseModuleList key={module._id.toString()} module={module} />
            );
          })}
      </Accordion>
    </>
  );
};

export default CourseCurriculam;
