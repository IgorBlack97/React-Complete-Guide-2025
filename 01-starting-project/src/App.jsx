import { useState } from "react";

import Header from "./components/Header/Header";
import DataInput from "./components/DataInput/DataInput";
import DataTable from "./components/DataTable/DataTable";

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 15000,
    annualInvestment: 900,
    expectedReturn: 5.5,
    duration: 12,
  });

  function onInputChange(value, key) {
    setUserInput((prevState) => ({ ...prevState, [key]: +value }));
  }

  return (
    <>
      <Header />
      <DataInput userInput={userInput} onInputChange={onInputChange} />
      <DataTable userInput={userInput} />
    </>
  );
}

export default App;
