import { Button } from "@/components/ui/button";
import { VideoPlayer } from "./_components/video-player";
import { Separator } from "@/components/ui/separator";
import VideoDescription from "./_components/video-description";
import { getCourseDetails, getLessonBySlug } from "@/backend/services/courses";
import { getCourseModulesDetails } from "@/backend/services/courses";
import LessonVideo from "./_components/lesson-video";
import { ILesson } from "@/interface/courses";
import { getWatchData } from "@/backend/services/lesson";
import { useLoggedInUser } from "@/hooks/use-loggedIn-user";

interface CourseProps {
	params: {
		id: string;
	};
	searchParams: {
		name: string;
		module: string;
	};
}

const Course =async ({params:{id}, searchParams:{name,module}}:CourseProps) => {

	const course = await getCourseModulesDetails(id);
	const allModules = course?.modules?.toSorted((a,b)=>a.order-b.order);
	const defaultLesson = allModules?.[0]?.lessonIds?.toSorted((a,b)=>a.order-b.order)?.[0];

	const lessonToPlay =(name? await getLessonBySlug(name) : defaultLesson ) as ILesson;

	const defaultModuleSlug = module ?? allModules?.[0]?.slug;

	const user = await useLoggedInUser();

	const selectedModule = allModules?.find((module) => module.slug === defaultModuleSlug);

	// watch data
	const watchData = selectedModule && user && await getWatchData(lessonToPlay.id, selectedModule.id, user?.id); 

	return (
		<div>
			<div className="flex flex-col max-w-4xl mx-auto pb-20">
				<div className="p-4 w-full">
					<LessonVideo courseId={id} lesson={lessonToPlay} defaultModuleSlug={defaultModuleSlug} lastTime={watchData?.lastTime || 0 } />
				</div>
				<div>
					<div className="p-4 flex flex-col md:flex-row items-center justify-between">
						<h2 className="text-2xl font-semibold mb-2">
							{lessonToPlay?.title}
						</h2>
						<Button size="lg">Enroll</Button>
					</div>
					<Separator />
					<VideoDescription description={lessonToPlay?.description} />
				</div>
			</div>
		</div>
	);
};
export default Course;
