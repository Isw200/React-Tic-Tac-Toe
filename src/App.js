import "./App.css";
import Board from "./components/Board";

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

  const handleButtonclick = (index) => {
    const newBoard = board.map((value, i) => {
      if (i === index) {
        return isXNext ? "X" : "O";
      } else {
        return value;
      }
    });
    setBoard(newBoard);

    checkWinner(newBoard);

    setIsXNext(!isXNext);
  };

  const checkWinner = (board) => {
    WINNING_COMBINATIONS.forEach((combination) => {
      const [a, b, c] = combination;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        alert(`${board[a]} is the winner`);
      } else if (!board.includes(null)) {
        alert("It's a tie");
        return;
      }
    });
  }; 

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <h2>Next Player: {isXNext ? "X" : "O"}</h2>
      <Board board={board} onClick={handleButtonclick} />
    </div>
  );
}

export default App;
