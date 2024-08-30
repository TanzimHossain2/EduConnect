import { getRelatedCourses } from "@/backend/services/courses";
import { SectionTitle } from "@/components/section-title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ICourse } from "@/interface/courses";
import CourseCard from "../../_components/CourseCard";

const RelatedCourses = async ({ tags }: { tags: string[] }) => {
  const relatedCourses = (await getRelatedCourses(tags)) as ICourse[];

  return (
    <section className="">
      <div className="container">
        <SectionTitle className="mb-6">Related Courses</SectionTitle>
        <Carousel
          opts={{
            align: "start",
          }}
          className="max-2xl:w-[90%] w-full mx-auto"
        >
          <CarouselPrevious />
          <CarouselNext />
          <CarouselContent>
            {relatedCourses &&
              relatedCourses.length > 0 &&
              relatedCourses.map((course) => (
                <CarouselItem
                  key={course.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <CourseCard course={course} />
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default RelatedCourses;
