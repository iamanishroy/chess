import React, { useState, useEffect } from "react";
import "./style.scss";
import getPieces from "./getPieces";
import Chess from "chess.js";
import { useParams } from "react-router-dom";
import { useAuth } from "contexts/auth";
import setSecondUser, { presence } from "functions/user";
import checkId from "functions/checkId";
import { db } from "adapter";
import updateFEN from "functions/match";

const game = new Chess();

// TODO: only jiska chance hoga wohi change kr payga

const Board = () => {
  const { currentUser } = useAuth();

  const { matchId } = useParams();
  const [matchIdChecked, setMatchIdChecked] = useState(false);
  const [match, setMatch] = useState(null);
  useEffect(() => {
    const subscribeToMatch = (matchId) => {
      db.ref("match/" + matchId).on("value", (snapshot) => {
        if (snapshot.val()) {
          // check for over TODO:
          let newMatchData = snapshot.val();
          game.load(newMatchData.fen);
          setPositions(game.board());
        }
      });
    };
    checkId(matchId).then((res) => {
      if (res) {
        console.log(res);
        if (res.u1.u === currentUser.uid) {
          // already in match its just a refresh
          // set first user as own
          // set second user as another
          setMatch(res.matchId);
          // console.log(res.fen);
          game.load(res.fen);
          setPositions(game.board());
          // subscribe to change
          subscribeToMatch(res.matchId);
          presence(res.matchId, "u1");
        } else if (res.u2?.u === currentUser.uid) {
          // already in match its just a refresh
          // set first user as another
          // set second user as own
          setMatch(res.matchId);
          console.log(res.fen);
          game.load(res.fen);
          setPositions(game.board());
          // subscribe to change
          subscribeToMatch(res.matchId);
          presence(res.matchId, "u2");
        } else {
          if (res.u2) {
            // match already started
            alert("already started");
            // exit
          } else {
            // register 2
            setSecondUser(res.matchId, currentUser);
            // set first user as another
            // set second user as own
            setMatch(res.matchId);
            game.load(res.fen);
            setPositions(game.board());
            // subscribe to change
            subscribeToMatch(res.matchId);
            presence(res.matchId, "u2");
          }
        }
      } else {
        console.log("No game");
      }
      setMatchIdChecked(true);
    });
  }, [matchId, currentUser]);

  const [currentSelected, setCurrentSelected] = useState(null);
  const [positions, setPositions] = useState(game.board());

  const handleClick = (l, i) => {
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
          if (game.game_over()) {
            alert(
              `game over winner:- ${game.turn()} -> ${
                game.turn() === "w" ? "black" : "white"
              }`
            );
          }
          setPositions(game.board());
          updateFEN(match, game.fen());
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
  };

  return (
    <>
      {matchIdChecked ? (
        match ? (
          <>
            <p>{matchId}</p>
            {positions && (
              <div className="chess-table">
                {Array(8)
                  .fill()
                  .map((e, index) => 8 - index)
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
        ) : (
          <>No Game</>
        )
      ) : (
        <>checkId</>
      )}
    </>
  );
};

export default Board;
