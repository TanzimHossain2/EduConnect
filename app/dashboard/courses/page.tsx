import { columns } from "./_components/columns";
import DataTable from "./_components/data-table";
import { ICourse } from "@/interface/courses";
import { getInstructorData, COURSE_DATA } from "@/lib/instructorData";

export const dynamic = "force-dynamic"

const CoursesPage = async () => {
  const courses = (await getInstructorData(COURSE_DATA)) as ICourse[];

  return (
    <div className="p-6">
      {courses && Array.isArray(courses) && (
        <DataTable columns={columns} data={courses} />
      )}
    </div>
  );
};

export default CoursesPage;
