import React from "react";

import "../Styles/Button.css";

export default function Button({ value, onClick }) {
  const style = value === "X" ? "btn x" : "btn o";
  return (
    <button className={style} onClick={onClick}>
      {value}
    </button>
  );
}
