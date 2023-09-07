import React from "react";
import Square from "./Square";

export default function Board({squares, handleClick, n}) {
  // Generate the board rows
  const rows = [];
  for (let i = 0; i < n; i++) {
    const squaresInRow = [];
    for (let j = 0; j < n; j++) {
      const index = i * n + j;
      squaresInRow.push(
        <Square key={index} 
                handleClick={() => handleClick(index)} 
                value={squares[index]} />
      );
    }
    rows.push(<div key={i} className="board-row">{squaresInRow}</div>);
  }

  return <div className="board">{rows}</div>;
}
