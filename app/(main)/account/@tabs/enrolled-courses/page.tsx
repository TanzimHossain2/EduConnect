import { getEnrollmentsForUser } from "@/backend/services/courses";
import { useLoggedInUser } from "@/hooks/use-loggedIn-user";
import Link from "next/link";
import { redirect } from "next/navigation";
import EnrolledCoursesCard from "../../_components/enrolled-coursecard";

const EnrolledCoursesPage = async () => {
  const loggedInUser = await useLoggedInUser();

  if (!loggedInUser) {
    redirect("/login");
  }

  const enrollments = await getEnrollmentsForUser(loggedInUser?.id);

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {enrollments && enrollments.length > 0 ? (
        enrollments.map((enrollment) => (
          <Link
            href={`/courses/${enrollment?.course?.id}/lesson`}
            key={enrollment.id}
          >
            <EnrolledCoursesCard key={enrollment.id} enrollment={enrollment} />
          </Link>
        ))
      ) : (
        <>
          <div className="flex items-center justify-center flex-col">
            <p className="text-lg font-semibold">No Enrollments Found...</p>

            <p className="text-sm text-gray-500">
              Please enroll in a course to see it here.
              <Link href="/courses">
                <span className="text-blue-500"> Browse Courses</span>
              </Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default EnrolledCoursesPage;
