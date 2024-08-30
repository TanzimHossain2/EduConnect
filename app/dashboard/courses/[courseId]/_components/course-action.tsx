"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { changeCoursePublishState, deleteCourse } from "@/app/actions/course";

interface CourseActionsProps {
  courseId: string;
  isActive: boolean;
}

export const CourseActions = ({ courseId, isActive }: CourseActionsProps) => {
  const [action, setAction] = useState<"change-active" | "delete" | "">("");
  const [published, setPublished] = useState<boolean>(isActive || false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      switch (action) {
        case "change-active": {
          const res = await changeCoursePublishState(courseId);

          if (res.error && res.activeState === undefined) {
            throw new Error(res.error);
          }
          setPublished(res.activeState || false);
          toast.success("Course publish state updated", { duration: 2000 });
          router.refresh();
          break;
        }
        case "delete": {

          if (published) {
            toast.error(
              "Cannot delete a published course, please unPublish first"
            );
            return;
          }

          const res = await deleteCourse(courseId);

          if (res.code !== 200) {
            throw new Error(res.error);
          }

          toast.success("Course deleted", { duration: 2000 });
          router.push(`/dashboard/courses`);

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
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setAction("change-active");
          }}
        >
          {published ? "Unpublish" : "Publish"}
        </Button>

        <Button
          size="sm"
          onClick={() => {
            setAction("delete");
          }}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};
