import React from "react";

import "../Styles/Button.css";

export default function Button({ value, onClick }) {
  return (
    <button className="btn" onClick={onClick}>
      {value}
    </button>
  );
}
