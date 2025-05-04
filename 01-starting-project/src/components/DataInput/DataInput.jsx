import CalculatorInput from "../CalculatorInput/CalculatorInput";

export default function DataInput({ userInput, onInputChange }) {
  return (
    <section id="user-input">
      <div className="input-group">
        <CalculatorInput
          label="Initial investment"
          value={userInput.initialInvestment}
          onChange={(evt) =>
            onInputChange(evt.target.value, "initialInvestment")
          }
        />
        <CalculatorInput
          label="Anual investment"
          value={userInput.annualInvestment}
          onChange={(evt) =>
            onInputChange(evt.target.value, "annualInvestment")
          }
        />
      </div>

      <div className="input-group">
        <CalculatorInput
          label="Expected return"
          value={userInput.expectedReturn}
          onChange={(evt) => onInputChange(evt.target.value, "expectedReturn")}
        />
        <CalculatorInput
          label="Duration"
          value={userInput.duration}
          onChange={(evt) => onInputChange(evt.target.value, "duration")}
        />
      </div>
    </section>
  );
}
