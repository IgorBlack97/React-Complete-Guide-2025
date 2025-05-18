import { useContext, useState } from "react";
import Answers from "./Answers";
import { QuizContext } from "../store/quiz-context";
import ProgressBar from "./ProgressBar";

export default function Question({}) {
  const quizContext = useContext(QuizContext);
  const userAnswers = quizContext.answers;
  const questionId = userAnswers.length;
  const questions = quizContext.questions;
  const questionData = questions[questionId];

  const [questionState, setQuestionState] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  function onAnswerSelect(answer) {
    setQuestionState({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setQuestionState({
        selectedAnswer: answer,
        isCorrect: answer === questions[questionId].answers[0],
      });

      setTimeout(() => {
        quizContext.addAnswer(answer);
      }, 2000);
    }, 1000);
  }

  const isAnswerSelected = questionState.selectedAnswer !== "";

  let progressBarTimeout = 15000;
  let progressBarMode = null;

  if (isAnswerSelected) {
    progressBarTimeout = questionState.isCorrect === null ? 1000 : 2000;
  }

  if (isAnswerSelected && questionState.isCorrect === null) {
    // if answer selected but result was not shown
    progressBarTimeout = 1000;
    progressBarMode = "answered";
  } else if (isAnswerSelected) {
    // if answer selected and result was shown
    progressBarTimeout = 2000;
    progressBarMode = questionState.isCorrect
      ? "answered-correct"
      : "answered-wrong";
  }

  return (
    <div id="question">
      <ProgressBar
        key={progressBarTimeout}
        timeOut={progressBarTimeout}
        mode={progressBarMode}
        onTimeout={() => {
          if (!isAnswerSelected) {
            quizContext.addAnswer(null);
          }
        }}
      />
      <h2>
        {questionId + 1}) {questionData.text}
      </h2>
      <Answers
        id={questionId}
        onSelect={onAnswerSelect}
        questionState={questionState}
      />
    </div>
  );
}
