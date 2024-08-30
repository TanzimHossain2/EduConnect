"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { changeQuizSetPublishState,deleteQuizSet } from "@/app/actions/quiz";
import { useRouter } from "next/navigation";

interface QuizSetActionProps {
  quizSetId: string;
  isActive: boolean;
}

export const QuizSetAction = ({ isActive,quizSetId }:QuizSetActionProps) => {
  const [action, setAction] = useState<"change-active" | "delete" | "">("");
  const [published, setPublished] = useState<boolean>(isActive || false);
  const router = useRouter();

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      switch (action) {
        case "change-active": {
          const res = await changeQuizSetPublishState(quizSetId);
          if(res.code !== 200){
            throw new Error(res.error);
          }
          setPublished(res.activeState);
          toast.success("Quiz Set publish state updated", { duration : 2000 });
          router.refresh();
          break;
        }
        case "delete": {

          if (published) {
            toast.error(
              "Cannot delete a published quiz set, please unPublish first"
            );
            return;
          }

          const res = await deleteQuizSet(quizSetId);

          if (res.code !== 200) {
            throw new Error(res.error);
          }

          toast.success("Quiz Set deleted", { duration: 2000 });
          router.push(`/dashboard/quiz-sets`);

          break;
        }
        default: {
          throw new Error("Invalid action type");
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred");
    }
  }

  return (
   <form onSubmit={handleSubmit}>
     <div className="flex items-center gap-x-2">
      <Button variant="outline" size="sm"
        onClick={() => setAction("change-active")}
      >
        {published ? "Unpublish" : "Publish"}
      </Button>

      <Button size="sm"
        onClick={() => setAction("delete")}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
   </form>
  );
};
