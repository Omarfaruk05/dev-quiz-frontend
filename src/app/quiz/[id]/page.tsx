import Quiz from "@/components/quiz/QuizHome";
import FooterComponent from "@/components/ui/FooterComponent";

const QuizPage = ({ params }: any) => {
  const { id } = params;

  return (
    <div>
      <Quiz id={id} />
      <FooterComponent />
    </div>
  );
};

export default QuizPage;
