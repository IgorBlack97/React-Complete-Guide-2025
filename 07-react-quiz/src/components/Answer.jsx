import { useState } from "react";
import questions from "../../questions";

export default function Answer({ content, onSelect, answerStatus, disabled }) {
  const cssClasses = [];
  if (answerStatus) {
    cssClasses.push(answerStatus);
  }

  function onAnswerSelect(answer) {
    onSelect(answer);
  }

  return (
    <li className="answer" key={content}>
      <button
        className={cssClasses.join(" ")}
        onClick={() => {
          onAnswerSelect(content);
        }}
        disabled={disabled}
      >
        {content}
      </button>
    </li>
  );
}
