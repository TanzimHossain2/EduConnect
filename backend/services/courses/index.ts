import { getCategories, getCategoryDetails } from "./categories";
import {
  getCourseDetails,
  getCourseDetailsByInstructor,
  getCourseList,
  getInstructorCourses,
} from "./courses";
import { getEnrollmentsForCourse, getEnrollmentsForUser, hasEnrollmentForCourse } from "./enrollments";
import { getLesson } from "./lessons";
import { getAReport } from "./reports";
import { getTestimonialsForCourse } from "./testimonials";



export {
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
