import React, { useState, useEffect } from "react";
import "./style.scss";
import getPieces from "./getPieces";
import { Game } from "js-chess-engine";
const game = new Game();
const Board = () => {
  // const [game] = useState(new Game());
  const [currentSelected, setCurrentSelected] = useState(null);
  const [positions, setPositions] = useState(game.exportJson().pieces);
  // alert(positions);
  useEffect(() => {
    console.log(game);
  }, [positions]);
  const handleClick = (l, i) => {
    if (currentSelected) {
      let prevMoves = game.moves(currentSelected[0] + currentSelected[1]);
      prevMoves.forEach((pm) => {
        if (pm === l + i) {
          game.move(currentSelected[0] + currentSelected[1], l + i);
          setCurrentSelected(null);
          setPositions(game.exportJson().pieces);
        }
      });
    }

    let moves = game.moves(l + i);
    document.querySelectorAll(".circle").forEach((e) => {
      e.style.display = "none";
    });
    moves.forEach((m) => {
      document.querySelector("#" + m + " div").style.display = "unset";
    });
    if (moves.length > 0) {
      setCurrentSelected([l, i]);
    } else {
      setCurrentSelected(null);
    }
  };

  return (
    <>
      {positions && (
        <div className="chess-table">
          {Array(8)
            .fill()
            .map((e, index) => 8 - index)
            .map((i, ni) =>
              Array(8)
                .fill()
                .map((e, index) =>
                  String.fromCharCode("A".charCodeAt(0) + index)
                )
                .map((l, li) => (
                  <div
                    key={`${l}${i}`}
                    id={`${l}${i}`}
                    onClick={() => {
                      handleClick(l, i);
                    }}
                    className={`piece-box ${
                      ni % 2 === li % 2 ? "black-box" : "white-box"
                    }`}
                  >
                    <div className="circle"></div>
                    {getPieces(l, i, positions)}
                  </div>
                ))
            )}
        </div>
      )}
    </>
  );
};

export default Board;
