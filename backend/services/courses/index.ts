import { getCategories, getCategoryDetails } from "./categories";
import { getCourseDetailsByInstructor ,getInstructorCourses} from "./courseByInstructor";
import {
  getCourseDetails,
  getCourseList,
  getCourseModulesDetails,
} from "./courses";
import { create } from "./createCourse";
import { getEnrollmentsForCourse, getEnrollmentsForUser, hasEnrollmentForCourse } from "./enrollments";
import { createLesson, getLesson, getLessonBySlug } from "./lessons";
import { createModule, getModuleById, getModuleBySlug } from "./modules";
import { createAssessmentReport, createWatchReport, getAReport } from "./reports";
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
  getLessonBySlug,
  getCourseModulesDetails,
  getModuleBySlug,
  createWatchReport,
  createAssessmentReport,
};
