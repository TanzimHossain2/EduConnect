import EnrollCourse from "@/components/enroll-course";
import { ICourse } from "@/interface/courses";
import { formatPrice } from "@/utils/formatPrice";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  course: ICourse;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link key={course.id} href={`/courses/${course.id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            src={`/assets/images/courses/${course?.thumbnail}`}
            alt={course?.title}
            className="object-cover"
            fill
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
            {course?.title}
          </div>
          <p className="text-xs text-muted-foreground">
            {course?.category?.title}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <div>
                <BookOpen className="w-4" />
              </div>
              <span>{course?.modules?.length} Chapters</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-md md:text-sm font-medium text-slate-700">
              {formatPrice(course?.price)}
            </p>

            <EnrollCourse asLink={true} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
