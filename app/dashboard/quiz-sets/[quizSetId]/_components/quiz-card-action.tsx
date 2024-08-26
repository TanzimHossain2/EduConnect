"use client";

import { deleteQuizFromQuizSet } from "@/app/actions/quiz";
import { Button } from "@/components/ui/button";
import useQuiz from "@/hooks/use-quiz";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface QuizCardActonProps {
  quiz: any;
  quizSetId: string;
}

type action = "edit" | "delete";

const QuizCardActon = ({ quiz, quizSetId }: QuizCardActonProps) => {
  const [action, setAction] = useState<action | null>(null);
  const { setQuizData } = useQuiz();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      switch (action) {
        case "edit": {
          setQuizData(quiz);
          break;
        }
        case "delete": {
          const res = await deleteQuizFromQuizSet(quizSetId, quiz.id);
          if (res.code !== 200) {
            throw new Error(res.error);
          }
          toast.success("Quiz deleted successfully");
          router.refresh();
          break;
        }
        default: {
          toast.error("Invalid action");
          break;
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setAction("edit");
          }}
        >
          <Pencil className="w-3 mr-1" /> Edit
        </Button>
        <Button
          size="sm"
          className="text-destructive"
          variant="ghost"
          onClick={() => {
            setAction("delete");
          }}
        >
          <Trash className="w-3 mr-1" /> Delete
        </Button>
      </form>
    </>
  );
};

export default QuizCardActon;
