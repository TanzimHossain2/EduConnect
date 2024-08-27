"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { UpdateCourse } from "@/app/actions/course";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Minus, Pencil, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  learning: z
    .array(z.string().min(1, { message: "Field cannot be empty" }))
    .min(1, { message: "At least one learning item is required" }),
});

interface LearningFormProps {
  initialData: {
    learning: string[];
  };
  courseId: string;
}

export const LearningForm = ({ initialData, courseId }: LearningFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      learning: initialData.learning.length > 0 ? initialData.learning : [""],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "learning" as never,
  });

  const onSubmit = async (values: { learning: string[] }) => {
    try {
      const res = await UpdateCourse(courseId, { learning: values.learning });

      if (res.code !== 200) {
        toast.error(res.error, { duration: 3000 });
        return;
      }

      toast.success("Course learning updated successfully", { duration: 2000 });
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Learning
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Learning
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <div className="text-sm mt-2">
          {initialData.learning.length > 0 ? (
            initialData.learning.map((item, index) => (
              <ul key={index} className="list-disc list-inside">
                <li  className="text-slate-500 text-base">{item}</li>
                </ul>
            ))
          ) : (
            <p className="text-slate-500 italic">No learning items</p>
          )}
        </div>
      )}

      {isEditing && (
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={control}
                name={`learning.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="e.g. 'Understand React Hooks'"
                        {...field}
                        value={field.value || ""} // Ensure value is a string
                      />
                    </FormControl>
                    <FormMessage />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              onClick={() => append("")} // Append an empty string
              variant="outline"
            >
              <Plus className="h-4 w-4" />
              Add Learning Item
            </Button>
            <div className="flex items-center gap-x-2 mt-4">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
