import {use} from 'react';
import { QuizContext } from "@/context";

const useQuiz = () => {
    const context = use(QuizContext);
    if (context === undefined) {
        throw new Error("useQuiz must be used within a QuizProvider");
    }
    return context;
};

export default useQuiz;