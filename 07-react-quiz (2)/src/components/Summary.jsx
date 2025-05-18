import { useContext } from "react";
import summaryImg from "../assets/quiz-complete.png";
import { QuizContext } from "../store/quiz-context";

export default function Summary() {
  const quizContext = useContext(QuizContext);
  const answers = quizContext.answers;
  const questions = quizContext.questions;

  const skippedArray = answers.filter((answer) => answer === null);
  const skippedCount = Math.round(
    (skippedArray.length / questions.length) * 100
  );

  const correctArray = answers.filter(
    (answer, index) => answer === questions[index].answers[0]
  );
  const correctCount = Math.round(
    (correctArray.length / questions.length) * 100
  );

  const incorrectCount = 100 - correctCount - skippedCount;

  return (
    <div id="summary">
      <img src={summaryImg} alt="Complete Icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedCount}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctCount}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{incorrectCount}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {answers.map((userAnswer, index) => {
          const cssClasses = ["user-answer"];

          if (userAnswer === null) {
            cssClasses.push("skipped");
          } else {
            cssClasses.push(
              userAnswer === questions[index].answers[0] ? "correct" : "wrong"
            );
          }

          return (
            <li key={`summary_question_${index}`}>
              <h3>{index + 1}</h3>
              <p className="question">{questions[index].text}</p>
              <p className={cssClasses.join(" ")}>{userAnswer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
