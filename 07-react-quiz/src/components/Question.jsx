import { useState } from "react";
import questions from "../../questions";
import Answers from "./Answers";
import ProgressBar from "./ProgressBar";

export default function Question({ onSkip, onSelect, questionKey }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  const activeQuestion = questions[questionKey];
  const isQuestionAnswered = answer.selectedAnswer !== "";

  let mode = "";
  let progressBarTimeOut = 30000;
  let progressBarMode = null;

  if (isQuestionAnswered && answer.isCorrect != null) {
    mode = answer.isCorrect ? "correct" : "wrong";
    progressBarTimeOut = 2000;
  } else if (isQuestionAnswered) {
    mode = "selected";
    progressBarTimeOut = 1000;
    progressBarMode = "answered";
  }

  function answerSelectHandler(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: activeQuestion.answers[0] === answer, // the first answer in questions array is a correct answer
      });

      setTimeout(() => {
        onSelect(answer);
      }, 2000);
    }, 1000);
  }

  return (
    <div id="question">
      <ProgressBar
        timeout={progressBarTimeOut}
        key={progressBarTimeOut}
        onTimeout={!isQuestionAnswered ? onSkip : null}
        mode={progressBarMode}
      />
      <h2>{activeQuestion.text}</h2>
      <Answers
        activeKey={questionKey}
        mode={mode}
        onSelect={answerSelectHandler}
        selectedAnswer={answer.selectedAnswer}
      />
    </div>
  );
}
