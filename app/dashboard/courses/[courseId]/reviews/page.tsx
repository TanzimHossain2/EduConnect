import { getCourseDetails } from "@/backend/services/courses";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { useInstructorData, REVIEW_DATA } from "@/hooks/use-Instractor";
import { ITestimonial } from "@/interface/courses";

const ReviewsPage = async ({params: {courseId}}: {params: {courseId: string}}) => {
  const  course = await getCourseDetails(courseId);
  const reviews = await useInstructorData(REVIEW_DATA) as ITestimonial[];

  const reviewDataForCourse = reviews.filter((review) => review.courseId.toString() === courseId);

  return (
    <div className="p-6">
      <h2>
        Reviews for {course?.title}  ({ course?.testimonials?.length})
      </h2>
      {
        reviewDataForCourse && reviewDataForCourse.length > 0 &&
        <DataTable columns={columns} data={reviewDataForCourse} />
      }
    </div>
  );
};

export default ReviewsPage;
