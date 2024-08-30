import { getCourseDetails } from "@/backend/services/courses/courses";
import { ICourse, ITestimonial } from "@/interface/courses";
import { replaceMongoIdInArray } from "@/utils/convertData";
import CourseDetails from "./_components/CourseDetails";
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import RelatedCourses from "./_components/RelatedCourses";
import Testimonials from "./_components/Testimonials";

const SingleCoursePage = async ({ params: { id } }: any) => {
  const course = (await getCourseDetails(id)) as ICourse;

  const testimonials = replaceMongoIdInArray(
    course?.testimonials
  ) as ITestimonial[];

  return (
    <>
      <CourseDetailsIntro course={course} />

      <CourseDetails course={course} />

      {course?.testimonials && <Testimonials testimonials={testimonials} />}

      <RelatedCourses tags={course?.tags} />
    </>
  );
};
export default SingleCoursePage;
