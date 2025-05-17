import { useRef } from "react";
import Answer from "./Answer";
import questions from "../../questions";

export default function Answers({
  activeKey,
  onSelect,
  selectedAnswer,
  isCorrect,
}) {
  const mixedAnswersRef = useRef();

  const activeQuestion = questions[activeKey];

  if (!mixedAnswersRef.current) {
    mixedAnswersRef.current = [...activeQuestion.answers].sort(
      () => Math.random() - 0.5
    );
  }

  let answeredState = "";
  if (selectedAnswer && isCorrect != null) {
    answeredState = isCorrect ? "correct" : "wrong";
  } else if (selectedAnswer) {
    answeredState = "selected";
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
            answerStatus={answer === selectedAnswer ? answeredState : null}
            onSelect={onSelect}
            disabled={selectedAnswer !== ""}
          />
        );
      })}
    </ul>
  );
}
