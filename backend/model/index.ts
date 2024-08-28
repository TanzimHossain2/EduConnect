import AssessmentModel from "./assessment.model";
import CategoryModel from "./caegory.model";
import CourseModel from "./course.model";
import EnrollmentModel from "./enrollment.model";
import LessonModel from "./lession.model";
import ModuleModel from "./module.model";
import QuizSetModel from "./quizset.model";
import QuizModel from "./quizzes.model";
import ReportModel from "./report.model";
import TestimonialModel from "./testimonial.model";
import UserModel from "./user.model";
import WatchModel from "./watch.model";

export const db = {
  course: CourseModel,
  category: CategoryModel,
  user: UserModel,
  testimonial: TestimonialModel,
  module: ModuleModel,
  enrollment: EnrollmentModel,
  lesson: LessonModel,
  report: ReportModel,
  assessment: AssessmentModel,
  quizSet: QuizSetModel,
  quiz: QuizModel,
  watch: WatchModel,
};
