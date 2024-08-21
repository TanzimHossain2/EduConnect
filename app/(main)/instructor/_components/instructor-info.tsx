import { getCourseDetailsByInstructor } from "@/backend/services/courses";
import { IUser } from "@/interface/courses";
import { MessageSquare, Presentation, Star, UsersRound } from "lucide-react";
import Image from "next/image";

interface Props {
  instructor: IUser;
}

const InstructorInfo: React.FC<Props> = async ({ instructor }) => {
  const CourseDetailsByInstructor = await getCourseDetailsByInstructor(
    instructor.id
  );

  return (
    <div className="col-span-12 lg:col-span-4 ">
      <div className="bg-white rounded-2xl p-6 shadow">
        <div className="mb-6">
          <div className="w-36 h-36 rounded-full  mb-5 mx-auto overflow-hidden">
            <Image
              src={instructor?.profilePicture}
              alt={instructor?.firstName}
              className="w-full h-full object-cover rounded"
              width={144}
              height={144}
            />
          </div>

          <div>
            <h4 className="text-xl lg:text-2xl text-center">
              {instructor?.firstName} {instructor?.lastName}
            </h4>
            <div className="text-gray-600 font-medium mb-6 text-sm text-center">
              {instructor?.designation}
            </div>
            <ul className=" items-center gap-3 flex-wrap text-sm text-gray-600 font-medium grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 md:grid-cols-4">
              <li className="flex items-center space-x-3">
                <Presentation className="text-gray-600 w-4" />
                <div>{CourseDetailsByInstructor?.courses}+ Courses</div>
              </li>
              <li className="flex items-center space-x-3">
                <UsersRound className="text-gray-600 w-4" />
                <div> {CourseDetailsByInstructor?.enrollments} Students</div>
              </li>
              <li className="flex items-center space-x-3">
                <MessageSquare className="text-gray-600 w-4" />
                <div>{CourseDetailsByInstructor?.reviews} Reviews</div>
              </li>
              <li className="flex items-center space-x-3">
                <Star className="text-gray-600 w-4" />
                <div>
                  {CourseDetailsByInstructor?.averageRating} Average Rating
                </div>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-gray-600 text-xs leading-[1.8]">{instructor?.bio}</p>
      </div>
    </div>
  );
};

export default InstructorInfo;
