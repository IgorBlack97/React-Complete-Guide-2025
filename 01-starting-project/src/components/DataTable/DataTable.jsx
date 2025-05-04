import { calculateInvestmentResults, formatter } from "../../util/investment";

export default function DataTable({ userInput }) {
  const investmentResults = calculateInvestmentResults(userInput);
  console.log(investmentResults);

  return (
    <section id="result" className="center">
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Investment Value</th>
            <th>Interest (Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>
          {investmentResults.map((result, key) => {
            const totalInterest =
              result.valueEndOfYear -
              result.annualInvestment * result.year -
              userInput.initialInvestment;

            const investedCapital = result.valueEndOfYear - totalInterest;

            return (
              <tr key={key}>
                <td>{result.year}</td>
                <td>{formatter.format(result.valueEndOfYear)}</td>
                <td>{formatter.format(result.interest)}</td>
                <td>{formatter.format(totalInterest)}</td>
                <td>{formatter.format(investedCapital)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
