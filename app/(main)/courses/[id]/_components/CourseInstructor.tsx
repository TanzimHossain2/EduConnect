import { getCourseDetailsByInstructor } from "@/backend/services/courses/courses";
import { ICourse } from "@/interface/courses";
import { MessageSquare, Presentation, Star, UsersRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; 

interface Props {
  course: ICourse;
}

const CourseInstructor: React.FC<Props> = async ({ course }) => {
  const instructor = course?.instructor;
  const instructorName = `${instructor?.firstName} ${instructor?.lastName}`;
  const CourseDetailsByInstructor = await getCourseDetailsByInstructor(
    instructor._id.toString()
  );

  return (
    <div className="bg-gray-50 rounded-md p-8">
      <div className="md:flex md:gap-x-5 mb-8">
        <div className="h-[310px] w-[270px] max-w-full flex-none rounded mb-5 md:mb-0">
          <Image
            src={instructor?.profilePicture}
            width={270}
            height={310}
            alt={instructorName}
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div className="flex-1">
          <div className="max-w-[300px]">
            <h4 className="text-[34px] font-bold leading-[51px]">
              {instructorName}
            </h4>
            <div className="text-gray-600 font-medium mb-6">
              {instructor?.designation}
            </div>
            <ul className="list space-y-4">
              <li className="flex items-center space-x-3">
                <Presentation className="text-gray-600" />
                <div>{CourseDetailsByInstructor?.courses} + Courses</div>
              </li>
              <li className="flex space-x-3">
                <UsersRound className="text-gray-600" />
                <div>
                  {CourseDetailsByInstructor?.enrollments} Student Learned
                </div>
              </li>
              <li className="flex space-x-3">
                <MessageSquare className="text-gray-600" />
                <div>{CourseDetailsByInstructor?.reviews} Reviews</div>
              </li>
              <li className="flex space-x-3">
                <Star className="text-gray-600" />
                <div>
                  {CourseDetailsByInstructor?.averageRating} Average Rating
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text-gray-600 mb-6">{instructor?.bio}</p>

      {/* Button to View Instructor Profile */}
      <Link  className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700" href={`/instructor/${instructor._id.toString()}`}>
          View Profile
      </Link>
    </div>
  );
};

export default CourseInstructor;
