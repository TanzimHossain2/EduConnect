"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { updateLesson } from "@/app/actions/lession";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { VideoPlayer } from "@/components/video-player";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { formatDuration } from "@/utils/date";


const formSchema = z.object({
  url: z.string().min(1, {
    message: "Required",
  }),
  duration: z.string().min(1, {
    message: "Required",
  }),
});

interface VideoUrlFormProps {
  initialData: {
    url: string;
    duration: number;
  };
  courseId: string;
  lessonId: string;
}

export const VideoUrlForm = ({ initialData, courseId, lessonId }:VideoUrlFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const [state, setState] = useState({
    url: initialData?.url,
    duration: formatDuration(initialData.duration),
  });

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: state,
  });


  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: any) => {
    const payload: { video_url?: string; duration?: number } = {};
    
    try {
      payload["video_url"] = values?.url;

      const duration = values?.duration;
      const durationArray = duration.split(":");

      if (durationArray.length === 3) {
        payload["duration"] =
          parseInt(durationArray[0]) * 3600 +
          parseInt(durationArray[1]) * 60 +
          parseInt(durationArray[2]);
      } else {
        toast.error("The duration should be in the format 'hh:mm:ss'");
        return;
      }

      const res = await updateLesson(lessonId, payload);
 
      if (res.error) {
        toast.error(res.error, { duration: 3000 });
        return;
      }

      setState({
        url: values.url,
        duration: payload.duration.toString(),
      })

      toast.success("Lesson updated");
      toggleEdit();
      router.refresh();
    } catch(err) {
      toast.error (err  instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Video URL
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit URL
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          <p className="text-sm mt-2">
            {state?.url}
          </p>
          <div className="mt-6">
            <VideoPlayer url={state?.url} />
          </div>
        </>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            {/* url */}
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course'"
                      
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* duration */}
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Duration</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. '10:30:18'"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
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
