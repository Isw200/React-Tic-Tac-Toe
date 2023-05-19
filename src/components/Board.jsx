import React from "react";
import Button from "./Button";

import "../Styles/Board.css";

export default function Board({ board, onClick }) {
  return (
    <div className="board">
      {board.map((value, index) => {
        return (
          <Button
            key={index}
            value={value}
            onClick={() => value === null && onClick(index)}
          />
        );
      })}
    </div>
  );
}
