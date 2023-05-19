import "./App.css";
import Board from "./components/Board";

// ES6 Modules or TypeScript
import Swal from "sweetalert2";

import { useState } from "react";

function App() {
  const WINNING_COMBINATIONS = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // first column
    [1, 4, 7], // second column
    [2, 5, 8], // third column
    [0, 4, 8], // first diagonal
    [2, 4, 6], // second diagonal
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [moveButtons, setMoveButtons] = useState([]);

  const handleButtonclick = (index) => {
    const newBoard = board.map((value, i) => {
      if (i === index) {
        return isXNext ? "X" : "O";
      } else {
        return value;
      }
    });
    setBoard(newBoard);

    // add current board to history
    history.push(newBoard);

    // add history button
    const addButton = () => {
      const newButton = { label: "Undo move No " + moveButtons.length };
      setMoveButtons([...moveButtons, newButton]);
    };
    addButton();

    checkWinner(newBoard);

    setIsXNext(!isXNext);
  };

  const wonMessage = (winner) => {
    const title = winner === "Nobody" ? "It's a tie!" : `Player ${winner} won!`;
    const icon = winner === "Nobody" ? "info" : "success";
    Swal.fire({
      title: title,
      text: "You can reset the game or undo your moves.",
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, undo moves!",
      cancelButtonText: "No, reset game!",
    }).then((result) => {
      if (result.isConfirmed) {
      } else {
        resetGame();
      }
    });
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setHistory([Array(9).fill(null)]);
    setMoveButtons([]);
  };

  // undo moves
  function moveBack(index) {
    console.log("moveBack", index);
    setBoard(history[index]);
    setIsXNext(index % 2 === 0);

    // remove history buttons
    setMoveButtons(moveButtons.slice(0, index));
  }

  const checkWinner = (board) => {
    WINNING_COMBINATIONS.forEach((combination) => {
      const [a, b, c] = combination;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        wonMessage(board[a]);
      } else if (!board.includes(null)) {
        wonMessage("Nobody");
        return;
      }
    });
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <h2>Next Player: {isXNext ? "X" : "O"}</h2>
      <Board board={board} onClick={handleButtonclick} />
      <div className="history">
        <button onClick={resetGame}>Reset Game</button>
        {moveButtons.map((button, i) => (
          <button key={i} onClick={() => console.log(moveBack(i))}>
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
