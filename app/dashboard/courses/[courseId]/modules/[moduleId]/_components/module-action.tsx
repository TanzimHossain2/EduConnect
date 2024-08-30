"use client";

import { Trash } from "lucide-react";

import { changeModulePublishState, deleteModule } from "@/app/actions/module";
import { Button } from "@/components/ui/button";
import { IModule } from "@/interface/courses";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ModuleActionsProps {
  moduleData: IModule;
  courseId: string;
}

const ModuleActions = ({ moduleData, courseId }: ModuleActionsProps) => {
  const [published, setPublished] = useState<boolean>(moduleData?.active);
  const [action, setAction] = useState<"change-active" | "delete" | "">("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      switch (action) {
        case "change-active": {
          const res = await changeModulePublishState(moduleData.id);

          if (res.error && res.activeState === undefined) {
            throw new Error(res.error);
          }
          setPublished(res.activeState || false);
          toast.success("Module publish state updated", { duration: 2000 });
          router.refresh();

          break;
        }
        case "delete": {
          if (published) {
            toast.error(
              "Cannot delete a published module, please unPublish first"
            );
            return;
          }
          const res = await deleteModule(moduleData.id);

          if (res.code !== 200) {
            throw new Error(res.error);
          }

          router.push(`/dashboard/courses/${courseId}`);

          break;
        }
        default: {
          throw new Error("Invalid action type");
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred");
    }

    setPublished(!published);
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
            {published ? "UnPublish" : "Publish"}
          </Button>

          <Button size="sm" onClick={() => setAction("delete")}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </>
  );
};

export default ModuleActions;
