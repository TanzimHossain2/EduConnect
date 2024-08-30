//import { CourseProgress } from "@/components/course-progress";
import CourseCard from "@/app/(main)/courses/_components/CourseCard";
import { getInstructorCourses } from "@/backend/services/courses";
import { getUserById } from "@/backend/services/users";
import { SectionTitle } from "@/components/section-title";
import { notFound } from "next/navigation";
import InstructorInfo from "../_components/instructor-info";

const InstructorProfile = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const instructor = await getUserById(id);

  if (!instructor) {
    notFound();
  }

  const courses = await getInstructorCourses(id);

  return (
    <section id="categories" className="space-y-6  py-6  lg:py-12">
      <div className="container grid grid-cols-12 lg:gap-x-8 gap-y-8">
        <InstructorInfo instructor={instructor} />
        <div className="col-span-12 lg:col-span-8">
          <div>
            <SectionTitle className="mb-6">Courses</SectionTitle>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {courses.map((course) => {
                return <CourseCard key={course.id} course={course} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default InstructorProfile;
