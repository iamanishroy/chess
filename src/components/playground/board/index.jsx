import React, { useState } from "react";
import "./style.scss";
import getPieces from "./getPieces";
import updateFEN from "functions/match";

// TODO: only jiska chance hoga wohi change kr payga = DONE

const Board = ({ game, match, positions, setPositions, myTurn, me }) => {
  const [currentSelected, setCurrentSelected] = useState(null);

  const handleClick = (l, i) => {
    if (myTurn) {
      if (currentSelected) {
        let prevMoves = game.moves({
          square: currentSelected[0] + currentSelected[1],
          verbose: true,
        });
        prevMoves.forEach((pm) => {
          if (pm.to === l + i) {
            if (pm.flags.indexOf("p") >= 0) {
              game.move({
                from: currentSelected[0] + currentSelected[1],
                to: l + i,
                promotion: pm.promotion,
              });
            } else {
              game.move({
                from: currentSelected[0] + currentSelected[1],
                to: l + i,
              });
            }
            setCurrentSelected(null);
            // console.log(game.fen());
            setPositions(game.board());
            updateFEN(match, game.fen());
            // if (game.game_over()) {
            //   alert(
            //     `game over winner:- ${game.turn()} -> ${
            //       game.turn() === "w" ? "black" : "white"
            //     }`
            //   );
            // }
          }
        });
      }

      let moves = game.moves({ square: l + i, verbose: true });
      document.querySelectorAll(".piece-box").forEach((e) => {
        e.removeAttribute("style");
      });
      document.querySelectorAll(".circle").forEach((e) => {
        e.style.display = "none";
      });
      moves.forEach((m) => {
        if (m.flags === "c") {
          document.getElementById(m.to).style.backgroundColor = "#b2a7fc";
        } else {
          document.querySelector("#" + m.to + " div").style.display = "unset";
        }
      });
      if (moves.length > 0) {
        setCurrentSelected([l, i]);
      } else {
        setCurrentSelected(null);
      }
    }
  };

  return (
    <>
      {positions && (
        <div className="chess-table">
          {Array(8)
            .fill()
            .map((e, index) => (me === 1 ? 8 - index : 1 + index))
            .map((i, ni) =>
              Array(8)
                .fill()
                .map((e, index) =>
                  String.fromCharCode("a".charCodeAt(0) + index)
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