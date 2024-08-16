import SearchPage from "./_components/SearchPage";
import SortCourse from "./_components/SortCourse";
import FilterCourseMobile from "./_components/FilterCourseMobile";
import ActiveFilters from "./_components/ActiveFilters";
import FilterCourse from "./_components/FilterCourse";
import { getCourseList } from "@/backend/services/courses";
import CourseCard from "./_components/CourseCard";

const CoursesPage = async () => {
  const courses = await getCourseList();
  return (
    <section
      id="courses"
      className="container space-y-6   dark:bg-transparent py-6"
    >
      <div className="flex items-baseline justify-between  border-gray-200 border-b pb-6 flex-col gap-4 lg:flex-row">
        <SearchPage />

        <div className="flex items-center justify-end gap-2 max-lg:w-full">
          <SortCourse />
          <FilterCourseMobile />
        </div>
      </div>

      <ActiveFilters
      
        filter={{
          categories: ["development"],
          price: ["free"],
          sort: "",
        }}
      />

      <section className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <FilterCourse />

          <div className="lg:col-span-3 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {courses.map((course) => {
              return <CourseCard course={course} key={course.id} />;
            })}
          </div>
        </div>
      </section>
    </section>
  );
};
export default CoursesPage;
