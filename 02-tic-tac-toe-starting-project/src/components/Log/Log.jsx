export default function Log({ gameStack }) {
  return (
    <ol id="log">
      {gameStack.map(({ row, col, symbol }) => (
        <li key={`item_${row}_${col}`}>
          User {symbol} clicked {row},{col}
        </li>
      ))}
    </ol>
  );
}
