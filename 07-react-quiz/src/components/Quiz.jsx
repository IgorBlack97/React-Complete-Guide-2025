import { useCallback, useEffect, useRef, useState } from "react";
import questions from "../../questions";
import Answer from "./Answer";
import summaryImg from "../assets/quiz-complete.png";
import ProgressBar from "./ProgressBar";
import Answers from "./Answers";
import Question from "./Question";

export default function Quiz() {
  const [answers, setAnswers] = useState([]);

  const activeQuestionKey = answers.length;

  const addAnswer = useCallback(
    (answer) => {
      setAnswers((prevState) => [...prevState, answer]);
    },
    [activeQuestionKey]
  );

  const handleSkipAnswer = useCallback(() => {
    addAnswer(null);
  });

  if (activeQuestionKey === questions.length) {
    return (
      <div id="summary">
        <img src={summaryImg} alt="Complete Icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <section id="quiz">
      <Question
        onSkip={handleSkipAnswer}
        onSelect={addAnswer}
        questionKey={activeQuestionKey}
        key={activeQuestionKey}
      />
    </section>
  );
}
