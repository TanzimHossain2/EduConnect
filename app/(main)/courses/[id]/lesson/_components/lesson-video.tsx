"use client";
import { ILesson } from "@/interface/courses";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ReactPlayer from "react-player/youtube";
import { toast } from "sonner";

interface LessonVideoProps {
  lesson: ILesson;
  defaultModuleSlug: string;
  courseId: string;
  lastTime: any;
}

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    const context = this;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

const LessonVideo = ({
  lesson,
  defaultModuleSlug,
  courseId,
  lastTime,
}: LessonVideoProps) => {
  const [hasWindow, setHasWindow] = useState(false);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [progress, setProgress] = useState(lastTime || 0);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  useEffect(() => {
    setProgress(lastTime);
  }, [lastTime]);

  const handleOnStart = () => {
    setStarted(true);
    setPlaying(true);
  };

  const handleOnEnd = () => {
    setEnded(true);
  };

  const handleOnProgress = (state: any) => {
    setProgress(state.playedSeconds);

    if (playing && !paused) {
      saveProgress(state.playedSeconds);
    }
  };

  const handleOnDuration = (duration: any) => {
    setDuration(duration);
  };

  const handleOnPause = () => {
    setPaused(true);
    saveProgress(progress);
  };

  const handleOnPlay = () => {
    setPlaying(true);
    setPaused(false);
  };

  const saveProgress = async (playedSeconds: number) => {
    try {
      const res = await fetch("/api/lesson-watch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId,
          lessonId: lesson.id,
          moduleSlug: defaultModuleSlug,
          state: ended ? "completed" : "started",
          lastTime: playedSeconds,
        }),
      });

      if (res.status !== 200) {
        toast.error("Failed to update lesson progress");
      }
    } catch (error) {
      console.error("Error saving progress:", error);
      toast.error("Failed to save lesson progress");
    }
  };

  useEffect(() => {
    if (started) {
      saveProgress(progress);
      setStarted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  useEffect(() => {
    if (ended) {
      saveProgress(progress);
      router.refresh();
      setEnded(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ended]);

  return (
    <>
      {hasWindow && (
        <ReactPlayer
          url={lesson.video_url}
          controls={true}
          width="100%"
          height="470px"
          onStart={handleOnStart}
          onEnded={handleOnEnd}
          onProgress={handleOnProgress}
          onDuration={handleOnDuration}
          onPause={handleOnPause}
          onPlay={handleOnPlay}
          progressInterval={1000}
          playing={playing}
          config={{
            playerVars: {
              start: Math.floor(progress),
            },
          }}
        />
      )}
    </>
  );
};

export default LessonVideo;
