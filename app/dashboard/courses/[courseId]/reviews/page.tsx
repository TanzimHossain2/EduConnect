import { getCourseDetails } from "@/backend/services/courses";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { useInstructorData, REVIEW_DATA } from "@/hooks/use-Instractor";
import { ITestimonial } from "@/interface/courses";

const reviews = [
  {
    id: 1,
    student: { name: "John Doe" },
    review: "Nice Course, Thanks for the help",
    rating: 5,
  },
  {
    id: 1,
    student: { name: "John Smilga" },
    review: "Nice Course, Thanks for the help",
    rating: 5,
  },
];
const ReviewsPage = async ({params: {courseId}}: {params: {courseId: string}}) => {
  const  course = await getCourseDetails(courseId);
  const reviews = await useInstructorData(REVIEW_DATA) as ITestimonial[];

  const reviewDataForCourse = reviews.filter((review) => review.courseId.toString() === courseId);


  return (
    <div className="p-6">
      <h2>
        Reviews for {course?.title}  ({ course?.testimonials?.length})
      </h2>
      <DataTable columns={columns} data={reviewDataForCourse} />
    </div>
  );
};

export default ReviewsPage;
