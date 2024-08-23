import { getCategories, getCategoryDetails } from "./categories";
import { getCourseDetailsByInstructor ,getInstructorCourses} from "./courseByInstructor";
import {
  getCourseDetails,
  getCourseList,
} from "./courses";
import { create } from "./createCourse";
import { getEnrollmentsForCourse, getEnrollmentsForUser, hasEnrollmentForCourse } from "./enrollments";
import { getLesson } from "./lessons";
import { createModule } from "./modules";
import { getAReport } from "./reports";
import { getTestimonialsForCourse } from "./testimonials";

export {
  create,
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
};
