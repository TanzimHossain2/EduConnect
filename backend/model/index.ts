import CategoryModel from "./caegory.model";
import CourseModel from "./course.model";
import EnrollmentModel from "./enrollment.model";
import LessonModel from "./lession.model";
import ModuleModel from "./module.model";
import TestimonialModel from "./testimonial.model";
import UserModel from "./user.model";

export const db = {
  course: CourseModel,
  category: CategoryModel,
  user: UserModel,
  testimonial: TestimonialModel,
  module: ModuleModel,
  enrollment: EnrollmentModel,
  lesson: LessonModel,
};
