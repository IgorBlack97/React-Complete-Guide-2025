import { useCallback, useState } from "react";
import questions from "../../questions";
import Question from "./Question";
import Summary from "./Summary";

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
    return <Summary answers={answers} />;
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
