export default function GameStatus({
  isDraw,
  winner,
  onPlayAgainClickHandler,
  userNames,
}) {
  let title = null;
  title = isDraw ? `It's a draw!` : null;
  title = winner ? `Player ${userNames[winner]} won!` : null;

  return (
    (isDraw || winner) && (
      <div id="game-over">
        <h2>Game Over!</h2>
        <p>{title}</p>
        <button onClick={onPlayAgainClickHandler}>Play again!</button>
      </div>
    )
  );
}
