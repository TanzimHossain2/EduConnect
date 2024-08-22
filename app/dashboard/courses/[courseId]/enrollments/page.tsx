import { getCourseDetails } from "@/backend/services/courses";
import { ENROLLMENT_DATA, useInstructorData } from "@/hooks/use-Instractor";
import { IEnrollment } from "@/interface/courses";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const EnrollmentsPage = async ({params: {courseId}}: {params: {courseId: string}}) => {
  const  course = await getCourseDetails(courseId);
  const allEnrollments = await useInstructorData(ENROLLMENT_DATA) as IEnrollment[];

  const enrollments = allEnrollments && allEnrollments.filter((enrollment: { course: any }) => enrollment.course === courseId);

  return (
    <div className="p-6">
     
      <h2>
        Enrollments for {course?.title}  ({ enrollments?.length})
      </h2>

      { enrollments && enrollments.length > 0 &&
        <DataTable columns={columns} data={enrollments} />
      }
      
    </div>
  );
};

export default EnrollmentsPage;
