import { useState } from "react";

import Counter from "./components/Counter/Counter.jsx";
import Header from "./components/Header.jsx";
import { log } from "./log.js";
import ConfigureCount from "./components/Counter/ConfigureCount.jsx";
import ErrorHandler from "./components/Counter/ErrorHandler.jsx";

function App() {
  log("<App /> rendered");

  const [chosenCount, setChosenCount] = useState(0);

  return (
    <ErrorHandler>
      <Header />
      <main>
        <ConfigureCount onSetCounter={setChosenCount} />
        <Counter key={chosenCount} initialCount={chosenCount} />
      </main>
    </ErrorHandler>
  );
}

export default App;
