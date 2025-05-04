export default function GameBoard({
  gameBoard,
  onBoardBtnClickHandler,
  activePlayer,
}) {
  return (
    <>
      {gameBoard.map((boardRow, rowId) => (
        <li key={`row_${rowId}`}>
          <ol>
            {boardRow.map((boardItem, columnId) => (
              <li key={`col_${columnId}`}>
                <button
                  onClick={() => {
                    onBoardBtnClickHandler(rowId, columnId, activePlayer);
                  }}
                  disabled={!!boardItem}
                >
                  {boardItem}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </>
  );
}
