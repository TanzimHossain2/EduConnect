"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { ILesson } from "@/interface/courses";
import { ChangeLessonPublishState, deleteLesson } from "@/app/actions/lession";

type action = "change-active" | "delete" | "";

interface LessonActionsProps {
  lesson: ILesson;
  moduleId: string;
  onDelete: () => void;
}

const LessonActions = ({ lesson, moduleId, onDelete }:LessonActionsProps) => {
  const [action, setAction] = useState<action>("");
  const [published, setPublished] = useState(lesson?.active);

  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      switch (action) {
        case "change-active": {

      const res =  await ChangeLessonPublishState(lesson.id);

      if (res.error){
        throw new Error(res.error);
      }
          setPublished(res.activeState);
          toast.success("Lesson publish state updated",{duration: 2000});
          break;
        }
        case "delete": {

          if(published){
            toast.error("Cannot delete a published lesson, please unPublish first");
            return;
          }

        const res=  await deleteLesson(lesson.id, moduleId);

          onDelete();
          break;
        }
        default: {
          throw new Error("Invalid action type");
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAction("change-active")}
          >
            {published ? "Unpublish" : "Publish"}
          </Button>

          <Button size="sm" onClick={() => setAction("delete")}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </>
  );
};

export default LessonActions;
