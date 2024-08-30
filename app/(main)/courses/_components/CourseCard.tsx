import { hasEnrollmentForCourse } from "@/backend/services/courses";
import EnrollCourse from "@/components/enroll-course";
import { useLoggedInUser } from "@/hooks/use-loggedIn-user";
import { ICourse } from "@/interface/courses";
import { formatPrice } from "@/utils/formatPrice";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  course: ICourse;
}

const CourseCard: React.FC<CourseCardProps> = async ({ course }) => {
  const loggedUser = await useLoggedInUser();

  const hasEnrolled = await hasEnrollmentForCourse(
    course.id,
    loggedUser?.id ?? ""
  );

  return (
    <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
      <Link key={course.id} href={`/courses/${course.id}`}>
        <div>
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
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between mt-4">
        <p className="text-md md:text-sm font-medium text-slate-700">
          {formatPrice(course?.price)}
        </p>

        {hasEnrolled ? (
          <Link
            href=""
            className="text-xs text-sky-700 h-7 gap-1 flex items-center px-2 py-1 border border-sky-700 rounded-md"
          >
            Continue Learning
          </Link>
        ) : (
          <EnrollCourse asLink={false} courseId={course?.id} />
        )}
      </div>
    </div>
  );
};

export default CourseCard;
