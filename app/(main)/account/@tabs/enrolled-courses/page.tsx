import { getEnrollmentsForUser } from "@/backend/services/courses";
import { useLoggedInUser } from "@/hooks/use-loggedIn-user";
import { redirect } from "next/navigation";
import EnrolledCoursesCard from "../../_components/enrolled-coursecard";

const EnrolledCoursesPage = async () => {
  const loggedInUser = await useLoggedInUser();

  if (!loggedInUser) {
    redirect("/login");
  }

  const enrollments  = await getEnrollmentsForUser(loggedInUser?.id);

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {enrollments && enrollments.length > 0 ? (
        enrollments.map((enrollment) => (
          <EnrolledCoursesCard key={enrollment.id} enrollment={enrollment} />
        ))
      ) : (
        <>
          <p>No Enrollments Found...</p>
          <p>
            Please enroll in a course to see it here.
            <a href="/courses">Browse Courses</a>
          </p>
        </>
      )}
    </div>
  );
};

export default EnrolledCoursesPage;
