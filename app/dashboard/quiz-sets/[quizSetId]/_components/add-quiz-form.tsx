"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { addQuizToQuizSet, updateQuizInQuizSet } from "@/app/actions/quiz";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useQuiz from "@/hooks/use-quiz";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const formSchema = z.object({
  title: z
    .string({
      required_error: "Question is required",
    })
    .min(1, {
      message: "Title is required",
    }),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(1, {
      message: "Description is required",
    }),
  optionA: z.object({
    label: z
      .string({
        required_error: "Option label is required",
      })
      .min(1, {
        message: "Option label is required",
      }),
    isTrue: z.boolean().default(false),
  }),
  optionB: z.object({
    label: z
      .string({
        required_error: "Option label is required",
      })
      .min(1, {
        message: "Option label is required",
      }),
    isTrue: z.boolean().default(false),
  }),
  optionC: z.object({
    label: z
      .string({
        required_error: "Option label is required",
      })
      .min(1, {
        message: "Option label is required",
      }),
    isTrue: z.boolean().default(false),
  }),
  optionD: z.object({
    label: z
      .string({
        required_error: "Option label is required",
      })
      .min(1, {
        message: "Option label is required",
      }),
    isTrue: z.boolean().default(false),
  }),
});

const defaultValues = {
  title: "",
  description: "",
  optionA: {
    label: "",
    isTrue: false,
  },
  optionB: {
    label: "",
    isTrue: false,
  },
  optionC: {
    label: "",
    isTrue: false,
  },
  optionD: {
    label: "",
    isTrue: false,
  },
};

export const AddQuizForm = ({ quizSetId }: { quizSetId: string }) => {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState([]);
  const { quizData, setQuizData, restQuizData } = useQuiz();
  const isEditing = !!quizData;

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: defaultValues,
  });

  const { isSubmitting, isValid, errors } = form.formState;

  // Populate form with quiz data if editing
  useEffect(() => {
    if (isEditing && quizData) {
      form.reset({
        title: quizData.title,
        description: quizData.description,
        optionA: {
          label: quizData.options[0].label,
          isTrue: quizData.options[0].isTrue,
        },
        optionB: {
          label: quizData.options[1].label,
          isTrue: quizData.options[1].isTrue,
        },
        optionC: {
          label: quizData.options[2].label,
          isTrue: quizData.options[2].isTrue,
        },
        optionD: {
          label: quizData.options[3].label,
          isTrue: quizData.options[3].isTrue,
        },
      });
    }
  }, [isEditing, quizData, form]);

  const onSubmit = async (values: any) => {
    try {
      const correctNessAns = [
        values.optionA.isTrue,
        values.optionB.isTrue,
        values.optionC.isTrue,
        values.optionD.isTrue,
      ];

      const correctMarked = correctNessAns.filter((ans) => ans === true);
      const isOneCorrect = correctMarked.length >= 1 ? true : false;

      if (!isOneCorrect) {
        toast.error("AtLeast one correct answer is required");
        return;
      }

      const res = isEditing
        ? await updateQuizInQuizSet(quizData.id, values)
        : await addQuizToQuizSet(quizSetId, values);

      if (res.code !== 200) {
        toast.error("Something went wrong");
        return;
      }

      isEditing
        ? toast.success("Quiz updated successfully")
        : toast.success("Quiz added successfully");

      if (isEditing) {
        restQuizData();
        setQuizData(null);
      }

      router.refresh();
      form.reset(defaultValues);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Add New Quiz
      </div>

      {
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            {/* quiz title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quiz Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter quiz question"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* quiz description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quiz Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Enter quiz description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* --------------- OPTION A -------- */}
            <div className="space-y-3">
              <FormLabel>Option A</FormLabel>
              <div className="flex items-start gap-3">
                <FormField
                  control={form.control}
                  name="optionA.isTrue"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex-1">
                  {/* option label  */}
                  <FormField
                    control={form.control}
                    name="optionA.label"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="Enter quiz question"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            {/* --------------- OPTION A ENDS -------- */}

            {/* --------------- OPTION B -------- */}
            <div className="space-y-3">
              <FormLabel>Option B</FormLabel>
              <div className="flex items-start gap-3">
                <FormField
                  control={form.control}
                  name="optionB.isTrue"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex-1">
                  {/* option label  */}
                  <FormField
                    control={form.control}
                    name="optionB.label"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="Enter quiz question"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            {/* --------------- OPTION B ENDS -------- */}

            {/* --------------- OPTION C -------- */}
            <div className="space-y-3">
              <FormLabel>Option C</FormLabel>
              <div className="flex items-start gap-3">
                <FormField
                  control={form.control}
                  name="optionC.isTrue"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex-1">
                  {/* option label  */}
                  <FormField
                    control={form.control}
                    name="optionC.label"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="Enter quiz question"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            {/* --------------- OPTION C ENDS -------- */}

            {/* --------------- OPTION D -------- */}
            <div className="space-y-3">
              <FormLabel>Option D</FormLabel>
              <div className="flex items-start gap-3">
                <FormField
                  control={form.control}
                  name="optionD.isTrue"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex-1">
                  {/* option label  */}
                  <FormField
                    control={form.control}
                    name="optionD.label"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="Enter quiz question"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            {/* --------------- OPTION D ENDS -------- */}
            <div className="flex items-center justify-end gap-x-2">
              <Button disabled={isSubmitting} type="submit">
                {isEditing ? "Update Quiz" : "Add Quiz"}
              </Button>
            </div>
          </form>
        </Form>
      }
    </div>
  );
};
