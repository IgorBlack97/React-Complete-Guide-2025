import { useContext } from "react";
import Question from "./Question";
import { QuizContext } from "../store/quiz-context";
import Summary from "./Summary";

export default function Quiz() {
  const quizContext = useContext(QuizContext);
  const userAnswers = quizContext.answers;
  const questionId = userAnswers.length;
  const questions = quizContext.questions;

  const questionData = questions[questionId];

  if (questionId >= questions.length) {
    return <Summary />;
  }

  return (
    <section id="quiz">
      <Question key={questionData.text} />
    </section>
  );
}
