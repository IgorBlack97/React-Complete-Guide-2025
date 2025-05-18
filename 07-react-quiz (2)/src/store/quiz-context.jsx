import { createContext, useReducer } from "react";
import questions from "../../questions";

export const QuizContext = createContext({
  answers: [],
  questions: [],
  addAnswer: () => {},
});

function quizAppReducer(state, action) {
  if (action.type === "ADD_NEW_ANSWER") {
    return { ...state, answers: [...state.answers, action.payload] };
  }

  return state;
}

export default function QuizAppContext({ children }) {
  const [quiz, quizDispatcher] = useReducer(quizAppReducer, {
    answers: [],
    questions: questions,
  });

  function handleUserAddAnswer(answer) {
    quizDispatcher({
      type: "ADD_NEW_ANSWER",
      payload: answer,
    });
  }

  const contextValue = {
    answers: quiz.answers,
    questions: quiz.questions,
    addAnswer: handleUserAddAnswer,
  };

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
}
