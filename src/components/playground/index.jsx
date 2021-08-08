import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Chess from "chess.js";
import { useAuth } from "contexts/auth";
import setSecondUser, { presence } from "functions/user";
import checkId from "functions/checkId";
import { db } from "adapter";
import Board from "./board";
import Details from "./details";

const game = new Chess();

const Playground = () => {
  const { currentUser } = useAuth();
  const [positions, setPositions] = useState(game.board());

  const { matchId } = useParams();
  const [matchIdChecked, setMatchIdChecked] = useState(false);
  const [match, setMatch] = useState(null);

  const [myTurn, setMyTurn] = useState(false);
  const [me, setMe] = useState(0);
  const [user1, setUser1] = useState(null);
  const [user2, setUser2] = useState(null);

  useEffect(() => {
    const subscribeToMatch = (matchId) => {
      db.ref("match/" + matchId).on("value", (snapshot) => {
        if (snapshot.val()) {
          let newMatchData = snapshot.val();
          setUser1(newMatchData.u1);
          setUser2(newMatchData.u2);

          // check for over TODO:
          game.load(newMatchData.fen);
          setPositions(game.board());

          // set my turn
          setMyTurn(
            (me === 1 && game.turn() === "w") ||
              (me === 2 && game.turn() === "b")
          );
        }
      });
    };
    checkId(matchId).then((res) => {
      if (res) {
        if (res.u1.u === currentUser.uid) {
          // already in match its just a refresh
          // set first user as own
          setMe(1);
          // set second user as another
          setUser1(res.u1);
          // if second user available then add u2 also
          if (res.u2) {
            setUser2(res.u2);
          } else {
            // wait to join
          }

          setMatch(res.matchId);
          game.load(res.fen);
          setPositions(game.board());
          // subscribe to change
          subscribeToMatch(res.matchId);
          presence(res.matchId, "u1");
        } else if (res.u2?.u === currentUser.uid) {
          // already in match its just a refresh
          // set first user as another
          setMe(2);
          setUser1(res.u1);
          setUser2(res.u2);
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
            setMe(2);
            setUser1(res.u1);
            setUser2({
              n: currentUser.displayName,
              o: "online",
              p: currentUser.photoURL,
              u: currentUser.uid,
            });
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
  }, [matchId, currentUser, me]);

  return (
    <>
      {matchIdChecked ? (
        match ? (
          <div className="playground">
            <div className="left">
              <Details user1={user1} user2={user2} />
            </div>
            <div className="right">
              <Board
                game={game}
                matchIdChecked={matchIdChecked}
                match={match}
                positions={positions}
                setPositions={setPositions}
                myTurn={myTurn}
              />
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
