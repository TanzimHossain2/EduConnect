//import { CourseProgress } from "@/components/course-progress";
import React from 'react'
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import { IEnrollment } from '@/interface/courses';
import { getAReport } from '@/backend/services/courses';

interface Props {
  enrollment: IEnrollment ;
}

const EnrolledCoursesCard : React.FC<Props> =async ({enrollment}) => {
  const filter = {
    course: enrollment?.course?.id,
    student: enrollment?.student,
  }

  const report =await getAReport(filter);
 
  

  // Total Completed Modules
  const totalCompletedModules = report?.totalCompletedModules?.length || 0;

  // get all Quizzes and assessments
  const quizzes = report?.quizAssessment?.assessments || [];
  const totalQuizzes = quizzes.length;

  // Find attempted quizzes
  const quizzesTaken = quizzes.filter((quiz) => quiz.attempted);

  // fIND how many quizzes answer is correct
  const totalCorrectAnswers = quizzesTaken.map(quiz =>  {
    const item = quiz?.options;

    return item.filter(ans => {
      // return only correct answers
      return (ans.isCorrect === true && ans.isSelected === true);
    }) 
  }).filter(item => item.length > 0).flat()

  const marksFromQuizzes = totalCorrectAnswers.length * 5;

  const otherMarks = report?.quizAssessment?.otherMarks || 0;

  const totalMarks = marksFromQuizzes + otherMarks;




 
  return (
    <div>   <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
    <div className="relative w-full aspect-video rounded-md overflow-hidden">
      <Image
        src={`/assets/images/courses/${enrollment?.course?.thumbnail}`}
        alt={enrollment?.course?.title} 
        className="object-cover"
        fill
      />
    </div>
    <div className="flex flex-col pt-2">
      <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
        {enrollment?.course?.title}
      </div>
      <p className="text-xs text-muted-foreground">
        {enrollment?.course?.category?.title}
      </p>
      <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
        <div className="flex items-center gap-x-1 text-slate-500">
          <div>
            <BookOpen className="w-4" />
          </div>
          <span>
            {enrollment?.course?.modules?.length}  Chapters</span>
        </div>
      </div>
      <div className=" border-b pb-2 mb-2">
        <div className="flex items-center justify-between">
          <p className="text-md md:text-sm font-medium text-slate-700">
            Total Modules:   {enrollment?.course?.modules?.length}
          </p>
          <div className="text-md md:text-sm font-medium text-slate-700">
            Completed Modules <Badge variant="outline">
              {totalCompletedModules}
            </Badge>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-md md:text-sm font-medium text-slate-700">
            Total Quizzes: {totalQuizzes}
          </p>

          <div className="text-md md:text-sm font-medium text-slate-700">
            Quiz taken <Badge variant="secondary">
              {quizzesTaken.length}
            </Badge>
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

      {/*<CourseProgress
                    size="sm"
                    value={80}
                    variant={default 100 ? "success" : ""}
/>*/}
    </div>
  </div>
</div>
  )
}

export default EnrolledCoursesCard