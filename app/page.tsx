import { getCourses } from "@/backend/services/courses";
import Test from "@/components/Test";

export default async function Home() {
  const courses = await getCourses();
  console.log(courses);

  return (
    <div>
      <h1>Hello, World!</h1>
      <Test />
    </div>
  );
}
