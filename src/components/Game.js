import React, { useState, useEffect } from "react";
import Board from "./Board";
import { calculateWinner } from "./helpers";

function Game() {
  const [n, setN] = useState(6); //n is the number of rows and columns in the board
  const [k, setK] = useState(3); //k is the number of squares in a row to win
  const [squares, setSquares] = useState(Array(n ** 2).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [steps, setSteps] = useState([squares]);

  const handleHistoryClick = (steps, index) => {
    setXIsNext(index % 2 === 0);
    setSquares(steps[index]);
  };
  function History(props) {
    const { steps } = props;
    return steps.map((step, index) => (
      <li key={index}>
        <button onClick={() => handleHistoryClick(steps, index)}>
          {index === 0 ? "Go to game start" : `Go to move #${index}`}
        </button>
      </li>
    ));
  }

  //Declaring a Winner
  useEffect(() => {
    setWinner(calculateWinner(squares, k));
  }, [squares, k]);
  //Adjust table dimension
  useEffect(() => {
    setSquares(Array(n ** 2).fill(null));
    setSteps([Array(n ** 2).fill(null)]);
  }, [n]);

  //Handle player
  const handleClick = (i) => {
    const squaresCopy = [...squares];
    if (calculateWinner(squaresCopy, k) || squaresCopy[i]) return;
    squaresCopy[i] = xIsNext ? "X" : "O";
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);

    const nonNullCount = squaresCopy.filter((square) => square !== null).length;
    if (nonNullCount < steps.length) {
      setSteps(steps.slice(0, nonNullCount + 1));
    } else {
      setSteps([...steps, squaresCopy]);
    }
  };

  //Restart game
  const handlRestart = () => {
    setSquares(Array(n ** 2).fill(null));
    setSteps([Array(n ** 2).fill(null)]);
    setXIsNext(true);
  };

  return (
    <div className="main-container">
      <div className="main">
        <h2 className="result">Winner: {winner ? winner : "Not Yet"}</h2>
        <div className="play-option">
          <div>Number of rows/columns: </div>
          <input
            type="number"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
          />
        </div>
        <div className="play-option">
          <div>Number of squares in a row to win: </div>
          <input
            type="number"
            value={k}
            onChange={(e) => setK(Number(e.target.value))}
          />
        </div>

        <div className="game">
          <span className="player">Next player: {xIsNext ? "X" : "O"}</span>
          <Board squares={squares} n={n} handleClick={handleClick} />
        </div>
        <button onClick={handlRestart} className="restart-btn">
          Restart
        </button>
      </div>
      <div className="history">
        <h4>History</h4>
        <History steps={steps} />
      </div>
    </div>
  );
}

export default Game;
