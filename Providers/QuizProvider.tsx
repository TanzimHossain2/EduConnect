"use client";

import { IQuizData, QuizContext } from "@/context/QuizContext";
import { useState } from "react";

const QuizProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
    const [quizData, setQuizData] = useState<IQuizData | null>(null);

  const restQuizData = () =>{
    setQuizData(null);
  }
  

  return (
    <QuizContext.Provider value={{ quizData, setQuizData, restQuizData }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
