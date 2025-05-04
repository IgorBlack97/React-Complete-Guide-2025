import { useState } from "react";
import Header from "./components/Header/Header";
import Player from "./components/Player/Player";
import GameBoard from "./components/GameBoard/GameBoard";
import Log from "./components/Log/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameStatus from "./components/GameStatus/GameStatus.jsx";

const INIT_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function getActivePlayer(gameStack) {
  let activePlayer = "X";
  if (gameStack.length) {
    activePlayer = gameStack[gameStack.length - 1].symbol === "X" ? "O" : "X";
  }

  return activePlayer;
}

function getGameBoard(gameStack) {
  const gameBoard = structuredClone(INIT_BOARD);
  for (const gameStackItem of gameStack) {
    gameBoard[gameStackItem.row][gameStackItem.col] = gameStackItem.symbol;
  }

  return gameBoard;
}

function getWinner(gameBoard) {
  let winner = null;
  for (const winningCombination of WINNING_COMBINATIONS) {
    const firstSymbol =
      gameBoard[winningCombination[0].row][winningCombination[0].column];

    const secondSymbol =
      gameBoard[winningCombination[1].row][winningCombination[1].column];

    const thirdSymbol =
      gameBoard[winningCombination[2].row][winningCombination[2].column];

    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = firstSymbol;
    }
  }

  return winner;
}

function chechIsDraw(winner, gameStack) {
  return !winner && gameStack.length === 9;
}

function App() {
  // States
  const [userNames, setUserNames] = useState({
    X: "User 1",
    O: "User 2",
  });
  const [gameStack, setGameStack] = useState([]);

  // activePlayer Logic
  let activePlayer = getActivePlayer(gameStack);

  // Board render Logic
  const gameBoard = getGameBoard(gameStack);

  // Winner
  let winner = getWinner(gameBoard);

  // Draw
  let isDraw = chechIsDraw(winner, gameStack);

  function onPlayerNameChange(playerSymbol, newName) {
    setUserNames((prevState) => ({ ...prevState, [playerSymbol]: newName }));
  }

  function onBoardBtnClickHandler(row, col, symbol) {
    setGameStack((prevState) => [...prevState, { row, col, symbol }]);
  }

  function onPlayAgainClickHandler() {
    setGameStack([]);
  }

  return (
    <>
      <Header />

      <section id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={userNames.X}
            symbol="X"
            saveNewName={onPlayerNameChange}
            isActive={activePlayer === "X"}
          />
          <Player
            name={userNames.O}
            symbol="O"
            saveNewName={onPlayerNameChange}
            isActive={activePlayer === "O"}
          />
        </ol>

        <ol id="game-board">
          <GameBoard
            gameBoard={gameBoard}
            onBoardBtnClickHandler={onBoardBtnClickHandler}
            activePlayer={activePlayer}
          />
        </ol>

        <GameStatus
          isDraw={isDraw}
          winner={winner}
          onPlayAgainClickHandler={onPlayAgainClickHandler}
          userNames={userNames}
        />
      </section>

      <Log gameStack={gameStack} />
    </>
  );
}

export default App;
