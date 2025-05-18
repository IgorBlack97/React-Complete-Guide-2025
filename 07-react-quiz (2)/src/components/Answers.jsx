import { useContext, useRef } from "react";
import { QuizContext } from "../store/quiz-context";

function getAnswerButtonClass(answer, questionState) {
  let answerClass = null;
  if (answer === questionState.selectedAnswer) {
    if (questionState.isCorrect !== null) {
      answerClass = questionState.isCorrect ? "correct" : "wrong";
    } else {
      answerClass = "selected";
    }
  }

  return answerClass;
}

export default function Answers({ id, onSelect, questionState }) {
  const shuffledAnswersRef = useRef();

  const quizContext = useContext(QuizContext);
  const questions = quizContext.questions;
  const answers = [...questions[id].answers];

  if (!shuffledAnswersRef.current) {
    shuffledAnswersRef.current = answers.sort(() => Math.random() - 0.5);
  }

  const isAnswerSelected = questionState.selectedAnswer !== "";

  return (
    <ul id="answers">
      {shuffledAnswersRef.current.map((answer) => {
        const answerClass = getAnswerButtonClass(answer, questionState);

        return (
          <li className="answer" key={answer}>
            <button
              className={answerClass}
              onClick={() => {
                onSelect(answer);
              }}
              disabled={isAnswerSelected}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
