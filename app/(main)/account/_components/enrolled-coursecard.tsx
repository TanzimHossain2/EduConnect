import { getAReport } from "@/backend/services/courses";
import CourseProgress from "@/components/course-progress";
import { Badge } from "@/components/ui/badge";
import { IEnrollment } from "@/interface/courses";
import { calculateProgress, calculateQuizMarks } from "@/lib/populateData";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  enrollment: IEnrollment;
}

const EnrolledCoursesCard: React.FC<Props> = async ({ enrollment }) => {
  const filter = {
    course: enrollment?.course?.id,
    student: enrollment?.student,
  };

  const report = await getAReport(filter);

  // Total Completed Modules
  const totalCompletedModules = report?.totalCompletedModules?.length || 0;

  // get all Quizzes and assessments
  const quizzes = report?.quizAssessment?.assessments || [];
  const totalQuizzes = quizzes.length || 0;

  // Find attempted quizzes
  const quizzesTaken = quizzes ? quizzes.filter((quiz) => quiz.attempted) : [];

  // Calculate marks from quizzes
  const marksFromQuizzes = calculateQuizMarks(quizzesTaken) || 0;
  const otherMarks = report?.quizAssessment?.otherMarks || 0;
  const totalMarks = marksFromQuizzes + otherMarks || 0;

  const progress = calculateProgress(
    enrollment?.course?.modules?.length || 0,
    totalCompletedModules
  );

  return (
    <>
      <Link
        href={`/courses/${enrollment?.course?.id}/lesson`}
      >
        <div>
          {" "}
          <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
            <div className="relative w-full aspect-video rounded-md overflow-hidden">
              <Image
                src={`/assets/images/courses/${enrollment?.course?.thumbnail}`}
                alt={enrollment?.course?.title}
                className="object-cover"
                fill
              />
            </div>
            <div className="flex flex-col pt-2">
              <>
                <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
                  {enrollment?.course?.title}
                </div>
              </>

              <p className="text-xs text-muted-foreground">
                {enrollment?.course?.category?.title}
              </p>
              <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                <div className="flex items-center gap-x-1 text-slate-500">
                  <div>
                    <BookOpen className="w-4" />
                  </div>
                  <span>{enrollment?.course?.modules?.length} Chapters</span>
                </div>
              </div>
              <div className=" border-b pb-2 mb-2">
                <div className="flex items-center justify-between">
                  <p className="text-md md:text-sm font-medium text-slate-700">
                    Total Modules: {enrollment?.course?.modules?.length}
                  </p>
                  <div className="text-md md:text-sm font-medium text-slate-700">
                    Completed Modules{" "}
                    <Badge variant="outline">{totalCompletedModules}</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-md md:text-sm font-medium text-slate-700">
                    Total Quizzes: {totalQuizzes}
                  </p>

                  <div className="text-md md:text-sm font-medium text-slate-700">
                    Quiz taken{" "}
                    <Badge variant="secondary">{quizzesTaken.length}</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-md md:text-sm font-medium text-slate-700">
                    Mark from Quizzes
                  </p>

                  <p className="text-md md:text-sm font-medium text-slate-700">
                    {marksFromQuizzes}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-md md:text-sm font-medium text-slate-700">
                    Others
                  </p>

                  <p className="text-md md:text-sm font-medium text-slate-700">
                    {otherMarks}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-md md:text-sm font-medium text-slate-700">
                  Total Marks
                </p>

                <p className="text-md md:text-sm font-medium text-slate-700">
                  {totalMarks}
                </p>
              </div>

              <CourseProgress size="sm" value={progress} />
            </div>
          </div>
        </div>

      </Link>
    </>
  );
};

export default EnrolledCoursesCard;
