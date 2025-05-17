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
      <ProgressBar timeout={5000} onTimeout={onSkip} />
      <h2>{activeQuestion.text}</h2>
      <Answers
        activeKey={questionKey}
        isCorrect={answer.isCorrect}
        onSelect={answerSelectHandler}
        selectedAnswer={answer.selectedAnswer}
      />
    </div>
  );
}
