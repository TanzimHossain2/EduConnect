import { getCourseDetailsByInstructor } from "@/backend/services/courses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLoggedInUser } from "@/hooks/use-loggedIn-user";
import { formatPrice } from "@/utils/formatPrice";
import { redirect } from "next/navigation";
import CourseAnalyticsChart from "./_components/CourseAnalyticsChart";

const DashboardPage = async () => {
  const loggedInUser = await useLoggedInUser();

  if (!loggedInUser) {
    redirect("/login");
  }

  if (loggedInUser.role !== "instructor") {
    redirect("/");
  }

  const courseStats = await getCourseDetailsByInstructor(loggedInUser.id);

  return (
    <div className="p-6">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {String(courseStats?.courses)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Enrollments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {courseStats?.enrollments.toString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(courseStats?.revenue ?? 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Analytics Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <CourseAnalyticsChart
              courses={Array.isArray(courseStats?.courses) ? courseStats?.courses.length : 0}
              enrollments={Array.isArray(courseStats?.enrollments) ? courseStats.enrollments.length : courseStats?.enrollments ?? 0}
              revenue={courseStats?.revenue ?? 0}
              reviews={Array.isArray(courseStats?.reviews) ? courseStats.reviews.length : courseStats?.reviews ?? 0}
              averageRating={parseFloat(courseStats?.averageRating ?? '0')}
            />
          </CardContent> 
        </Card>
      </div>
    </div>


  );
};

export default DashboardPage;
