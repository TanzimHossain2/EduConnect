import { addQuizAssessment } from "@/app/actions/quiz";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { IQuiz } from "@/interface/courses";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

interface Props {
  quizzes: IQuiz[];
  open: boolean;
  setOpen: (open: boolean) => void;
  quizSetId: string;
  courseId: string;
}

function QuizModal({ quizzes, open, setOpen, quizSetId, courseId }: Props) {
  const totalQuizzes = quizzes?.length;
  const [quizIndex, setQuizIndex] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const lastQuizIndex = totalQuizzes - 1;
  const currentQuiz = quizzes[quizIndex];
  const router = useRouter();

  // change quiz
  const quizChangeHandler = (type: any) => {
    const nextQuizIndex = quizIndex + 1;
    const prevQuizIndex = quizIndex - 1;
    if (type === "next" && nextQuizIndex <= lastQuizIndex) {
      console.log("next");
      return setQuizIndex((prev) => prev + 1);
    }
    if (type === "prev" && prevQuizIndex >= 0) {
      setQuizIndex((prev) => prev - 1);
    }
  };

  const updateAnswer = async (
    e: ChangeEvent<HTMLInputElement>,
    quizId: string,
    quizTitle: string,
    selected: string | undefined
  ) => {
    const key = e.target.name;
    const checked = e.target.checked;

    const obj: { option?: string } = {};
    if (checked) {
      obj["option"] = selected;
    }

    const answer = {
      quizId: quizId,
      options: [obj],
    };

    const found = answers.find((a) => a.quizId === answer.quizId);

    if (found) {
      const filtered = answers.filter((a) => a.quizId !== answer.quizId);
      setAnswers([...filtered, answer]);
    } else {
      setAnswers([...answers, answer]);
    }
  };

  const submitQuiz = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      console.log(answers);
      await addQuizAssessment(courseId, quizSetId, answers);
      setOpen(false);
      router.refresh();
      toast.success("Quiz submitted successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error submitting quiz");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[95%] block">
          <div className="pb-4 border-b border-border text-sm">
            <span className="text-success inline-block mr-1">
              {quizIndex + 1} / {quizzes.length}
            </span>{" "}
            টি প্রশ্ন
          </div>

          <div className="py-4">
            <h3 className="text-xl font-medium mb-10">
              <svg
                className="text-success inline"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"
                ></path>
              </svg>{" "}
              {quizzes[quizIndex].title}
            </h3>
            <span className="text-[10px] block text-end">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                version="1.1"
                viewBox="0 0 16 16"
                className="text-success inline"
                height="12"
                width="12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 4.75c0-0.412 0.338-0.75 0.75-0.75h0.5c0.412 0 0.75 0.338 0.75 0.75v0.5c0 0.412-0.338 0.75-0.75 0.75h-0.5c-0.412 0-0.75-0.338-0.75-0.75v-0.5z"></path>
                <path d="M10 12h-4v-1h1v-3h-1v-1h3v4h1z"></path>
                <path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 14.5c-3.59 0-6.5-2.91-6.5-6.5s2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5z"></path>
              </svg>{" "}
              There is no negative marking. There will be multiple answers.
              Please select all the correct answers.
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-6">
            {currentQuiz?.options &&
              currentQuiz?.options.length > 0 &&
              currentQuiz?.options.map((option, index) => (
                <div key={`${option.label}-${index}`}>
                  <input
                    className="opacity-0 invisible absolute [&:checked_+_label]:bg-success/5"
                    type="checkbox"
                    id={`option-${option.label}`}
                    name={`option-${option.label}`}
                    onChange={(e) =>
                      updateAnswer(
                        e,
                        quizzes[quizIndex].id,
                        quizzes[quizIndex].title,
                        option.label
                      )
                    }
                  />
                  <Label
                    className="border border-border rounded px-2 py-3 block cursor-pointer hover:bg-gray-50 transition-all font-normal"
                    htmlFor={`option-${option.label}`}
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
          </div>
          <DialogFooter className="flex gap-4 justify-between w-full sm:justify-between">
            <Button
              className="gap-2 rounded-3xl"
              disabled={quizIndex === 0}
              onClick={() => quizChangeHandler("prev")}
            >
              <ArrowLeft /> Previous Quiz
            </Button>

            <Button
              className="gap-2 rounded-3xl bg-green-600"
              onClick={submitQuiz}
              type="submit"
            >
              Submit
            </Button>

            <Button
              className="gap-2 rounded-3xl"
              disabled={quizIndex >= lastQuizIndex}
              onClick={() => quizChangeHandler("next")}
            >
              Next Quiz <ArrowRight />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default QuizModal;
