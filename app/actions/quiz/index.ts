"use server";

import { db } from "@/backend/model";
import { createAssessmentReport } from "@/backend/services/courses";
import { createQuiz, getQuizSetById } from "@/backend/services/quiz";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { getSlug } from "@/utils/slug";
import mongoose from "mongoose";
import * as z from "zod";

// Define the schema for quizData using Zod
const quizDataSchema = z.object({
  title: z.string(),
  description: z.string(),
  optionA: z.object({
    label: z.string(),
    isTrue: z.boolean(),
  }),
  optionB: z.object({
    label: z.string(),
    isTrue: z.boolean(),
  }),
  optionC: z.object({
    label: z.string(),
    isTrue: z.boolean(),
  }),
  optionD: z.object({
    label: z.string(),
    isTrue: z.boolean(),
  }),
});

export const updateQuizSet = async (quizSetId: string, values: any) => {
  try {
    const res = await db.quizSet.findByIdAndUpdate(quizSetId, values, {
      new: true,
    });

    if (!res) {
      return {
        code: 404,
        error: "Quiz set not found",
      };
    }

    return {
      code: 200,
      message: "Quiz set updated",
    };
  } catch (err) {
    console.error("Error updating quiz set", err);
    return {
      code: 500,
      error: "Error updating quiz set",
    };
  }
};

export const addQuizToQuizSet = async (quizSetId: string, quizData: any) => {
  // Validate quizData using Zod
  const parsedQuizData = quizDataSchema.safeParse(quizData);

  if (!parsedQuizData.success) {
    return {
      code: 400,
      error: "Invalid quiz data",
    };
  }

  const transformedQuizData = {
    title: parsedQuizData.data.title,
    description: parsedQuizData.data.description,
    slug: getSlug(parsedQuizData.data.title) ?? "",
    options: [
      {
        text: parsedQuizData.data.optionA.label,
        is_correct: parsedQuizData.data.optionA.isTrue,
      },
      {
        text: parsedQuizData.data.optionB.label,
        is_correct: parsedQuizData.data.optionB.isTrue,
      },
      {
        text: parsedQuizData.data.optionC.label,
        is_correct: parsedQuizData.data.optionC.isTrue,
      },
      {
        text: parsedQuizData.data.optionD.label,
        is_correct: parsedQuizData.data.optionD.isTrue,
      },
    ],
  };

  try {
    const res = await createQuiz(transformedQuizData);

    if (!res) {
      return {
        code: 404,
        error: "Quiz not created",
      };
    }

    const quizSet = await db.quizSet.findById(quizSetId);

    if (!quizSet) {
      return {
        code: 404,
        error: "Quiz set not found",
      };
    }

    quizSet.quizIds.push(res.id);
    await quizSet.save();

    return {
      code: 200,
      message: "Quiz added to quiz set",
    };
  } catch (err) {
    console.error("Error adding quiz to quiz set", err);
    return {
      code: 500,
      error:
        err instanceof Error ? err.message : "Error adding quiz to quiz set",
    };
  }
};

export const updateQuizInQuizSet = async (quizId: string, quizData: any) => {
  const parsedQuizData = quizDataSchema.safeParse(quizData);

  if (!parsedQuizData.success) {
    return {
      code: 400,
      error: "Invalid quiz data",
    };
  }

  const transformedQuizData = {
    title: parsedQuizData.data.title,
    description: parsedQuizData.data.description,
    slug: getSlug(parsedQuizData.data.title) ?? "",
    options: [
      {
        text: parsedQuizData.data.optionA.label,
        is_correct: parsedQuizData.data.optionA.isTrue,
      },
      {
        text: parsedQuizData.data.optionB.label,
        is_correct: parsedQuizData.data.optionB.isTrue,
      },
      {
        text: parsedQuizData.data.optionC.label,
        is_correct: parsedQuizData.data.optionC.isTrue,
      },
      {
        text: parsedQuizData.data.optionD.label,
        is_correct: parsedQuizData.data.optionD.isTrue,
      },
    ],
  };

  try {
    const res = await db.quiz.findByIdAndUpdate(quizId, transformedQuizData, {
      new: true,
    });

    if (!res) {
      return {
        code: 404,
        error: "Quiz not found",
      };
    }

    return {
      code: 200,
      message: "Quiz updated",
    };
  } catch (err) {
    console.error("Error updating quiz", err);
    return {
      code: 500,
      error: "Error updating quiz",
    };
  }
};

export const deleteQuizFromQuizSet = async (
  quizSetId: string,
  quizId: string
) => {
  try {
    const quizSet = await db.quizSet.findById(quizSetId);

    if (!quizSet) {
      return {
        code: 404,
        error: "Quiz set not found",
      };
    }

    // Remove the quiz from the quiz set array
    quizSet.quizIds.pull(quizId);
    await quizSet.save();

    return {
      code: 200,
      message: "Quiz deleted from quiz set",
    };
  } catch (err) {
    console.error("Error deleting quiz from quiz set", err);
    return {
      code: 500,
      error: "Error deleting quiz from quiz set",
    };
  }
};

export const changeQuizSetPublishState = async (quizSetId: string) => {
  try {
    const quizSet = await db.quizSet.findById(quizSetId);

    if (!quizSet) {
      return {
        code: 404,
        error: "Quiz set not found",
      };
    }

    quizSet.active = !quizSet.active;
    await quizSet.save();

    return {
      code: 200,
      activeState: quizSet.active,
    };
  } catch (err) {
    console.error("Error changing quiz set publish state", err);
    return {
      code: 500,
      error: "Error changing quiz set publish state",
    };
  }
};

export const deleteQuizSet = async (quizSetId: string) => {
  try {
    // find quizSet by id
    const quizSet = await db.quizSet.findById(quizSetId);

    if (!quizSet) {
      return {
        code: 404,
        error: "Quiz set not found",
      };
    }

    // delete quizIds from quizSet
    if (quizSet.quizIds.length > 0) {
      await db.quiz.deleteMany({ _id: { $in: quizSet.quizIds } });
    }

    // check if quizSet linked to any course
    const course = await db.course.findOne({ quizSet: quizSetId });
    if (course) {
      course.quizSet = null;
      await course.save();
    }

    // delete quizSet
    await db.quizSet.findByIdAndDelete(quizSetId);

    return {
      code: 200,
      message: "Quiz set deleted",
    };
  } catch (err) {
    console.error("Error deleting quiz set", err);
    return {
      code: 500,
      error: err instanceof Error ? err.message : "Error deleting quiz set",
    };
  }
};

export const createQuizSet = async (data: any) => {
  try {
    const slug = getSlug(data?.title);
    data["slug"] = slug;
    const quizSet = await db.quizSet.create(data);

    return {
      code: 200,
      quizSetId: quizSet._id.toString(),
    };
  } catch (err) {
    console.error("Error creating quiz set", err);
    return {
      code: 500,
      error: err instanceof Error ? err.message : "Error creating quiz set",
    };
  }
};

export const addQuizAssessment = async (
  courseId: string,
  quizSetId: string,
  answers: any
) => {
  try {
    const loggedInUser = await getLoggedInUser();

    if (!loggedInUser) {
      return {
        code: 401,
        error: "Unauthorized",
      };
    }

    const quizSet = await getQuizSetById(quizSetId);

    if (!quizSet) {
      return {
        code: 404,
        error: "Quiz set not found",
      };
    }

    const quizzes = quizSet.quizIds;

    const assessmentRecord = quizzes.map((quiz) => {
      const obj: any = {};
      obj.quizId = new mongoose.Types.ObjectId(quiz.id);
      const found = answers.find((a: any) => a.quizId === quiz.id);
      if (found) {
        obj.attempted = true;
      } else {
        obj.attempted = false;
      }

      const mergedOptions = quiz.options.map((o) => {
        return {
          option: o.text,
          isCorrect: o.is_correct,
          isSelected: (function () {
            const found = answers.find(
              (a: any) => a.options[0].option === o.text
            );
            if (found) {
              return true;
            } else {
              return false;
            }
          })(),
        };
      });
      obj["options"] = mergedOptions;
      return obj;
    });

    const assessmentEntry: any = {};
    assessmentEntry.assessments = assessmentRecord;
    assessmentEntry.otherMarks = 0;

    const assessment = await db.assessment.create(assessmentEntry);

    await createAssessmentReport({
      courseId: courseId,
      userId: loggedInUser?.id,
      quizAssessment: assessment?._id,
    });
  } catch (err) {
    console.error("Error adding quiz assessment", err);
    return {
      code: 500,
      error:
        err instanceof Error ? err.message : "Error adding quiz assessment",
    };
  }
};
