import { useInstructorData, COURSE_DATA } from "@/hooks/use-Instractor";
import { columns } from "./_components/columns";
import DataTable from "./_components/data-table";
import { ICourse } from "@/interface/courses";

const CoursesPage = async () => {
  const courses = await useInstructorData(COURSE_DATA) as ICourse[];
  
  return (
    <div className="p-6">
      {courses && Array.isArray(courses) && (
        <DataTable columns={columns} data={courses} />
      )}
    </div>
  );
};

export default CoursesPage;
