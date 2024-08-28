import { db } from "@/backend/model";
import { createWatchReport, getLesson, getModuleBySlug } from "@/backend/services/courses";
import { State } from "@/interface/courses";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { NextRequest, NextResponse } from "next/server";

// constant variable
const STARTED = "started";
const COMPLETED = "completed";

const updateReport = async (userId: string, courseId: string, moduleId: string, lessonId: string) => {
    try {
        // Call for creating/updating report
        createWatchReport({ userId, courseId, moduleId, lessonId });
    } catch (err) {
        
    }
}


export const POST = async (req: NextRequest) => {
  try {
    const { courseId, lessonId, moduleSlug, state, lastTime } =
      await req.json();

    const loggedInUser = await getLoggedInUser();

    if (!loggedInUser) {
      return new NextResponse(`You are not Authenticated`, { status: 401 });
    }

    const lesson = await getLesson(lessonId);

    if (!lesson) {
      return new NextResponse(`Lesson not found`, { status: 404 });
    }

    if (state !== STARTED && state !== COMPLETED) {
      return new NextResponse(`Invalid state`, { status: 400 });
    }

    const moduleData = await getModuleBySlug(moduleSlug);

    if (!moduleData) {
      return new NextResponse(`Module not found`, { status: 404 });
    }

    const watchEntry = {
      lastTime,
      lesson: lesson.id,
      module: moduleData.id,
      user: loggedInUser.id,
      state,
    };


      const found = await db.watch
        .findOne({
          lesson: lessonId,
          module: moduleData.id,
          user: loggedInUser.id,
        })
        .lean();

    //   if (state === STARTED) {
    //     if (!found) {
    //       await db.watch.create(watchEntry);
    //     }
    //   } else if (state === COMPLETED) {
    //     if (!found) {
    //       await db.watch.create(watchEntry);
    //     } else {
    //       if (found.state === (STARTED as State)) {
    //         await db.watch.findByIdAndUpdate(found._id, { state: COMPLETED, lastTime });
    //       }
    //     }
    //   }


    if (!found) {
        await db.watch.create(watchEntry);
        await updateReport(loggedInUser.id, courseId, moduleData.id, lessonId);
      } else {
        // Always update the lastTime, even if the record already exists
        const updateData:any = { lastTime };
  
        // If the state is COMPLETED and the existing state is STARTED, update the state as well
        if (state === COMPLETED && found.state === STARTED) {
          updateData['state'] = COMPLETED;
        }
  
        await db.watch.findByIdAndUpdate(found._id, updateData);
        await updateReport(loggedInUser.id, courseId, moduleData.id, lessonId);
      }

      return new NextResponse(`Watch Record Updated successfully`, {
        status: 200,
      });
    
  } catch (err) {
    return new NextResponse(
      `${err instanceof Error ? err.message : "An error occurred"}`,
      { status: 500 }
    );
  }
};
