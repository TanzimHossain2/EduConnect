"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus, Pencil } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { UpdateCourse } from "@/app/actions/course";

const tagsSchema = z.object({
  tags: z.array(z.string().min(1, { message: "Tag cannot be empty" })).min(1, { message: "At least one tag is required" }),
});

interface TagsFormProps {
  initialTags: string[];
  courseId: string;
}

export const TagsForm = ({ initialTags, courseId }: TagsFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm({
    resolver: zodResolver(tagsSchema),
    defaultValues: {
    tags: initialTags &&  initialTags.length > 0 ? initialTags : [""],
    },
  });

  const { control, handleSubmit, formState: { isSubmitting, isValid } } = form;
  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
    control,
    name: "tags" as never,
  });

  const handleFormSubmit = async (values: { tags: string[] }) => {


    try {
      const res = await UpdateCourse(courseId, { tags: values.tags });

      if (res.code !==200) {
        throw new Error('Failed to update tags');
      }

      toast.success("Tags updated successfully", { duration: 2000 });
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error( error instanceof Error ? error.message : "Something went wrong");
      console.error("Error updating tags:", error);
    }
  };

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Tags
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Tags
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <div className="text-sm mt-2">
          { initialTags &&  initialTags.length > 0 ? (
            <ul className="list-disc list-inside">
              {initialTags.map((tag, index) => (
                <li key={index} className="text-slate-500 text-base">{tag}</li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 italic">No tags available</p>
          )}
        </div>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 mt-4">
          {
            tagFields && tagFields.length > 0 &&
          tagFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-x-2">
              <Input
                placeholder="e.g. 'JavaScript'"
                {...control.register(`tags.${index}`)}
                //@ts-ignore
                defaultValue={field.value || ""}
                className="flex-1"
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeTag(index)}
                className="p-1"
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => appendTag("")} // Append an empty string
            variant="outline"
            className="flex items-center gap-x-2 mt-2"
          >
            <Plus className="h-4 w-4" />
            Add Tag
          </Button>
          <div className="flex items-center gap-x-2 mt-4">
            <Button disabled={!isValid || isSubmitting} type="submit">
              Save Tags
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TagsForm;
