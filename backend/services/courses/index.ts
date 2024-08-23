import { getCategories, getCategoryDetails } from "./categories";
import { getCourseDetailsByInstructor ,getInstructorCourses} from "./courseByInstructor";
import {
  getCourseDetails,
  getCourseList,
} from "./courses";
import { create } from "./createCourse";
import { getEnrollmentsForCourse, getEnrollmentsForUser, hasEnrollmentForCourse } from "./enrollments";
import { createLesson, getLesson } from "./lessons";
import { createModule, getModuleById } from "./modules";
import { getAReport } from "./reports";
import { getTestimonialsForCourse } from "./testimonials";

export {
  create,
  createLesson,
  createModule,
  getCategories,
  getCategoryDetails,
  getCourseDetails,
  getCourseDetailsByInstructor,
  getCourseList,
  getEnrollmentsForCourse,
  getEnrollmentsForUser,
  getLesson,
  getTestimonialsForCourse,
  getAReport,
  hasEnrollmentForCourse,
  getInstructorCourses,
  getModuleById,
};
