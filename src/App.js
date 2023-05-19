import "./App.css";
import Board from "./components/Board";


import { useState } from "react";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleButtonclick = (index) => {
    const newBoard = board.map((value, i) => {
      if (i === index) {
        return isXNext ? "X" : "O";
      } else {
        return value;
      }
      return value;
    });
    setBoard(newBoard);

    setIsXNext(!isXNext);
  };

  return (
    <div className="App">
      <Board board={board} onClick={handleButtonclick} />
    </div>
  );
}

export default App;
