import { getAllQuizSets } from "@/backend/services/quiz";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { IQuizSet } from "@/interface/courses";

const QuizSetsPage = async () => {

  const quizSets = await getAllQuizSets() as IQuizSet[];
  // console.log(quizSets);
  const mappedQuizSets = quizSets?.map(q=> {
    return {
      id: q.id,
      title: q.title,
      isPublished: q.active,
      totalQuiz: q.quizIds.length,
      quizzes: q.quizIds
    }
  })
  

  return (
    <div className="p-6">
      <DataTable columns={columns} data={mappedQuizSets} />
    </div>
  );
};

export default QuizSetsPage;
