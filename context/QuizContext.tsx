"use client";

import { createContext, Dispatch, SetStateAction } from "react";

export interface IQuizData {
  id: string;
  title: string;
  description: string;
  options: {
    label: string;
    isTrue: boolean;
  }[];
}

export interface IQuizContext {
  quizData?: IQuizData | null;
  setQuizData: Dispatch<SetStateAction<IQuizData | null>>;
  restQuizData: () => void;
}

export const QuizContext = createContext<IQuizContext | undefined>(undefined);
