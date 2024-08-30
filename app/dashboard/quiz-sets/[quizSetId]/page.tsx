import { getQuizSetById } from "@/backend/services/quiz";
import AlertBanner from "@/components/alert-banner";
import { cn } from "@/lib/utils";
import QuizProvider from "@/Providers/QuizProvider";
import { Circle, CircleCheck } from "lucide-react";
import { redirect } from "next/navigation";
import { AddQuizForm } from "./_components/add-quiz-form";
import QuizCardActon from "./_components/quiz-card-action";
import { QuizSetAction } from "./_components/quiz-set-action";
import { TitleForm } from "./_components/title-form";
 
const EditQuizSet = async ({ params: { quizSetId } }: any) => {
  const quizSet = await getQuizSetById(quizSetId);

  if (!quizSet) {
    redirect("/dashboard/quiz-sets");
  }

  const quizzes =
    quizSet?.quizIds.map((quiz) => {
      return {
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        options: quiz.options.map((option) => {
          return {
            label: option.text,
            isTrue: option.is_correct,
          };
        }),
      };
    }) || [];


  return (
    <>
      {!quizSet?.active && (
        <AlertBanner
          className="mb-6"
          label="This course is unpublished. It will not be visible in the course."
          variant="warning"
        />
      )}

      <QuizProvider>
        <div className="p-6">
          <div className="flex items-center justify-end">
            <QuizSetAction quizSetId={quizSetId} isActive={quizSet?.active} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2  gap-6 mt-16">
            {/* Quiz List */}
            <div className="max-lg:order-2">
              <h2 className="text-xl mb-6">Quiz List</h2>
              {quizzes.length === 0 && (
                <AlertBanner
                  label="No Quiz are in the set, add some using the form above."
                  variant="warning"
                  className="rounded mb-6"
                />
              )}
              <div className="space-y-6">
                {quizzes.length > 0 &&
                  quizzes.map((quiz) => {
                    return (
                      <div
                        key={quiz.id}
                        className=" bg-gray-50 shadow-md p-4 lg:p-6 rounded-md border"
                      >
                        <h2 className="mb-3">{quiz.title}</h2>
                        <p className="text-gray-600">{quiz.description}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {quiz.options &&
                            quiz.options.length > 0 &&
                            quiz.options.map((option, index) => {
                              return (
                                <div
                                  className={cn(
                                    "py-1.5 rounded-sm  text-sm flex items-center gap-1 text-gray-600"
                                  )}
                                  key={`${option.label}`+index} 
                                >
                                  {option.isTrue ? (
                                    <CircleCheck className="size-4 text-emerald-500 " />
                                  ) : (
                                    <Circle className="size-4" />
                                  )}

                                  <p>{option.label}</p>
                                </div>
                              );
                            })}
                        </div>

                        <div className="flex items-center justify-end gap-2 mt-6">
                          <QuizCardActon quiz={quiz} quizSetId={quizSetId} />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            {/*  */}
            <div>
              <div className="flex items-center gap-x-2">
                <h2 className="text-xl">Customize your quiz set</h2>
              </div>
              <div className="max-w-[800px]">
                <TitleForm
                  initialData={{
                    title: quizSet?.title,
                  }}
                  quizSetId={quizSetId}
                />
              </div>

              <div className="max-w-[800px]">
                <AddQuizForm quizSetId={quizSetId} />
              </div>
            </div>
          </div>
        </div>
      </QuizProvider>
    </>
  );
};
export default EditQuizSet;
