import { getCourseByCategory } from "@/backend/services/courses";
import { Accordion } from "@/components/ui/accordion";
import { ICourse } from "@/interface/courses";
import Link from "next/link";
import CourseCard from "../../_components/CourseCard";
import PriceFilter from "../../_components/PriceFilter";
import RatingFilter from "../../_components/RatingFilter";
import SearchPage from "../../_components/SearchPage";
import SortCourse from "../../_components/SortCourse";

interface IParams {
  params: {
    categoryId: string;
  };
  searchParams: {
    sort: string;
    price: string;
    minPrice: string;
    maxPrice: string;
    search: string;
  };
}

const CategoriesPage = async ({
  params: { categoryId },
  searchParams,
}: IParams) => {
  const sort = searchParams?.sort || "";
  const price = searchParams?.price || "";
  const minPrice = searchParams?.minPrice || "";
  const maxPrice = searchParams?.maxPrice || "";
  const search = searchParams?.search || "";

  const filter = {
    sort,
    price,
    minPrice,
    maxPrice,
    search,
  };

  const courses = (await getCourseByCategory(categoryId, filter)) as ICourse[];

  return (
    <div>
      <section
        id="categories"
        className="container space-y-6   dark:bg-transparent py-6"
      >
        <div className="flex items-baseline justify-between  border-gray-200 border-b pb-6 flex-col gap-4 lg:flex-row">
          <SearchPage />
          <div className="flex items-center justify-end gap-2 max-lg:w-full">
            <SortCourse />
          </div>
        </div>

        <section className="pb-24 pt-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <div className="hidden lg:block">
              <Accordion defaultValue={["price"]} type="multiple">
                <PriceFilter />
                <RatingFilter />
              </Accordion>
            </div>

            <div className="lg:col-span-3 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
              {courses && courses.length > 0 ? (
                courses.map((course) => {
                  return <CourseCard course={course} key={course.id} />;
                })
              ) : (
                <div className="col-span-3 text-center text-gray-500">
                  <p>No courses found for this category</p>
                  <p>
                    <Link
                      href="/courses"
                      className="text-blue-500 hover:underline"
                    >
                      Go back to courses
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default CategoriesPage;
