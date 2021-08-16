import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "contexts/auth";
import setSecondUser, { presence } from "functions/user";
import checkId from "functions/checkId";
import Board from "./board";
import Details from "./details";

import "./style.scss";
/*
TODO: change view on u2 (solved by {me})
TODO: timer -> 
TODO: on end(draw, winner)
TODO: on promotion // ui
TODO: don't update on own move
TODO: save matchId if not logged in 
*/

const Playground = () => {
  const { currentUser } = useAuth();
  const { matchId } = useParams();
  const [matchIdChecked, setMatchIdChecked] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const [me, setMe] = useState(0);

  useEffect(() => {
    checkId(matchId).then(async (res) => {
      if (res) {
        if (res.u1.u === currentUser.uid) {
          // already in match its just a refresh
          // set first user as own
          setMe(1);
          // set second user as another
          setMatchFound(true);
          // subscribe to change
          presence(res.matchId, "u1");
        } else if (res.u2?.u === currentUser.uid) {
          // already in match its just a refresh
          // set first user as another
          setMe(2);
          setMatchFound(true);
          // subscribe to change
          presence(res.matchId, "u2");
        } else {
          if (res.u2) {
            // match already started
            alert("already started");
            // exit
          } else {
            // register 2
            setSecondUser(res.matchId, currentUser);
            setMe(2);
            setMatchFound(true);
            presence(res.matchId, "u2");
          }
        }
      } else {
        console.log("No game");
      }
      setMatchIdChecked(true);
    });
  }, [matchId, currentUser]);

  return (
    <>
      {matchIdChecked ? (
        matchFound ? (
          <div className="playground">
            <div className="left">
              <Details matchId={matchId} me={me} />
            </div>
            <div className="right">
              <Board matchId={matchId} me={me} />
            </div>
          </div>
        ) : (
          <>No Match</>
        )
      ) : (
        <>checking ID</>
      )}
    </>
  );
};

export default Playground;
