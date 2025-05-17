import { useRef } from "react";
import Answer from "./Answer";
import questions from "../../questions";

export default function Answers({ activeKey, onSelect, selectedAnswer, mode }) {
  const mixedAnswersRef = useRef();
  const activeQuestion = questions[activeKey];

  if (!mixedAnswersRef.current) {
    mixedAnswersRef.current = [...activeQuestion.answers].sort(
      () => Math.random() - 0.5
    );
  }

  return (
    <ul id="answers">
      {mixedAnswersRef.current.map((answer) => {
        if (answer === selectedAnswer) {
        }

        return (
          <Answer
            key={answer}
            content={answer}
            answerStatus={answer === selectedAnswer ? mode : null}
            onSelect={onSelect}
            disabled={selectedAnswer !== ""}
          />
        );
      })}
    </ul>
  );
}
