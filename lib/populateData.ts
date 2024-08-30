import { getUserById } from "@/backend/services/users";
import { getAReport, getCourseDetails } from "@/backend/services/courses";
import {
  IEnrollment,
  ITestimonial,
  IAssessments,
} from "@/interface/courses";

export const populateStudentData = async (userId: string) => {
  const student = await getUserById(userId);
  return {
    studentName: `${student?.firstName} ${student?.lastName}`,
    studentEmail: student?.email,
  };
};

export const calculateQuizMarks = (quizzes: IAssessments[], mark = 5) => {
  const quizzesTaken = quizzes.filter((quiz) => quiz.attempted);
  const totalCorrectAnswers = quizzesTaken
    .map((quiz) => {
      const item = quiz?.options;
      return item.filter((ans) => ans.isCorrect && ans.isSelected);
    })
    .filter((item) => item.length > 0)
    .flat();

  return totalCorrectAnswers.length * mark;
};

export const calculateProgress = (
  totalModules: number,
  totalCompletedModules: number
) => {
  return (totalCompletedModules / totalModules) * 100;
};

export const populateEnrollmentData = async (enrollments: IEnrollment[]) => {
  return Promise.all(
    enrollments.map(async (enrollment) => {
      const studentData = await populateStudentData(
        enrollment?.student as unknown as string
      );
      const course = await getCourseDetails(
        enrollment?.course as unknown as string
      );
      const report = await getAReport({
        course: enrollment?.course,
        student: enrollment?.student,
      });

      const progress = calculateProgress(
        course?.modules?.length || 0,
        report?.totalCompletedModules?.length || 0
      );
      const quizMark = calculateQuizMarks(
        report?.quizAssessment?.assessments || []
      );

      return {
        ...enrollment,
        ...studentData,
        progress,
        quizMark,
        otherMarks: report?.quizAssessment?.otherMarks || 0,
        totalMarks: quizMark + (report?.quizAssessment?.otherMarks || 0),
      };
    })
  );
};

export const populateReviewData = async (reviews: ITestimonial[]) => {
  return Promise.all(
    reviews.map(async (review) => {
      const studentData = await populateStudentData(
        review?.user as unknown as string
      );
      return {
        ...review,
        ...studentData,
      };
    })
  );
};
