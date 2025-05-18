import Header from "./components/Header";
import Quiz from "./components/Quiz";
import QuizAppContext from "./store/quiz-context";

function App() {
  return (
    <>
      <Header />
      <main>
        <QuizAppContext>
          <Quiz />
        </QuizAppContext>
      </main>
    </>
  );
}

export default App;
