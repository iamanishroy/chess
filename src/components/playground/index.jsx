import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Chess from "chess.js";
import { useAuth } from "contexts/auth";
import setSecondUser, { presence } from "functions/user";
import checkId from "functions/checkId";
import { db } from "adapter";
import Board from "./board";
import Details from "./details";
import useRTC from "hooks/useRTC";

// import Peer from "simple-peer";

const game = new Chess();
// let once = true;
/*
TODO: change view on u2 (solved by {me})
TODO: timer -> 
TODO: on end(draw, winner)
TODO: on promotion // ui
TODO: don't update on own move
TODO: save matchId if not logged in 
*/

// const servers = {
//   iceServers: [
//     {
//       urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
//     },
//   ],
//   iceCandidatePoolSize: 10,
// };

// const pc = new RTCPeerConnection(servers);

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
  const [myID, setAnotherID, send, data, connected] = useRTC(currentUser.uid);

  useEffect(() => {
    if (me !== 0 && match) {
      if (me === 1) {
        db.ref("match/" + matchId + "/u1").update({
          s: myID,
        });
      } else {
        db.ref("match/" + matchId + "/u2").update({
          s: myID,
        });
      }
    }
  }, [me, myID, matchId]);
  useEffect(() => {
    console.log(data);
  }, [data]);
  const subscribeToMatch = useCallback(() => {
    if (me) {
      db.ref("match/" + matchId).on("value", (snapshot) => {
        if (snapshot.val()) {
          // check if previous(own move) then don't change/ execute TODO:
          let newMatchData = snapshot.val();
          setUser1(newMatchData.u1);
          setUser2(newMatchData.u2);

          game.load(newMatchData.fen);
          setPositions(game.board());
          // check for over
          if (game.game_over()) {
            // draw
            // winner
            // repetition
            alert(
              `game over winner:- ${game.turn()} -> ${
                game.turn() === "w" ? "black" : "white"
              }`
            );
          }
          // set my turn
          setMyTurn(
            (me === 1 && game.turn() === "w") ||
              (me === 2 && game.turn() === "b")
          );
        }
      });
    }
  }, [matchId, me]);

  useEffect(() => {
    checkId(matchId).then(async (res) => {
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

          db.ref("match/" + matchId + "/u2/s").on("value", (snapshot) => {
            if (snapshot.val()) {
              console.log(snapshot.val());
              setAnotherID(snapshot.val());
            }
          });
          /////////////////////////////////////////////////////////////////////
          // const peer = new Peer({ initiator: true, trickle: false, stream });

          // peer.on("signal", (data) => {
          //   db.ref("match/" + matchId + "/u1").update({
          //     s: data,
          //   });
          // });

          // peer.on("stream", (currentStream) => {
          //   userVideo.current.srcObject = currentStream;
          // });

          // db.ref("match/" + matchId + "/u2").on("value", (snapshot) => {
          //   console.log(snapshot);
          //   if (snapshot.val()) {
          //     console.log(snapshot.val().s);
          //     if (once && snapshot.val()?.s) {
          //       peer.signal(snapshot.val().s);
          //       peer.send("oo");
          //       once = false;
          //     }
          //   }
          // });

          // peer.on("connect", () => {
          //   console.log("connected");
          // });

          /*
          pc.onicecandidate = (event) => {
            console.log(event);
            pc.send("h777");
            // event.candidate && offerCandidates.add(event.candidate.toJSON());
          };

          // Create offer
          const offerDescription = await pc.createOffer();
          await pc.setLocalDescription(offerDescription);

          const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type,
          };
          console.log(offer);

          db.ref("match/" + matchId + "/u1").update({
            r: offer,
          });

          // LISTEN TO REMOTE ANSWER TODO:

          /*
            // Listen for remote answer
            callDoc.onSnapshot((snapshot) => {
              const data = snapshot.data();
              if (!pc.currentRemoteDescription && data?.answer) {
                const answerDescription = new RTCSessionDescription(data.answer);
                pc.setRemoteDescription(answerDescription);
              }
            });

            // When answered, add candidate to peer connection
            answerCandidates.onSnapshot((snapshot) => {
              snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                  const candidate = new RTCIceCandidate(change.doc.data());
                  pc.addIceCandidate(candidate);
                }
              });
            });
            */
        } else if (res.u2?.u === currentUser.uid) {
          // already in match its just a refresh
          // set first user as another
          setMe(2);
          setUser1(res.u1);
          setUser2(res.u2);
          // set second user as own
          setMatch(res.matchId);
          // console.log(res.fen);
          game.load(res.fen);
          setPositions(game.board());
          // subscribe to change
          subscribeToMatch(res.matchId);
          presence(res.matchId, "u2");

          setAnotherID(res.u1.u);
          ////////////////////////////////////////////////////////////////
          // const peer = new Peer({ initiator: false, trickle: false, stream });

          // peer.on("signal", (data) => {
          //   db.ref("match/" + matchId + "/u2").update({
          //     s: data,
          //   });
          // });

          // peer.on('stream', (currentStream) => {
          //   userVideo.current.srcObject = currentStream;
          // });

          // peer.signal(res.u1?.s);

          // peer.on("data", (d) => {
          //   console.log(d);
          // });
          // peer.on("m", () => {
          //   console.log("connected");
          // });
          /***************************/
          /*
          pc.onicecandidate = (event) => {
            console.log(event);
            // event.candidate && answerCandidates.add(event.candidate.toJSON());
          };

          const offerDescription = res.u1?.r;
          await pc.setRemoteDescription(
            new RTCSessionDescription(offerDescription)
          );

          const answerDescription = await pc.createAnswer();
          await pc.setLocalDescription(answerDescription);

          const answer = {
            type: answerDescription.type,
            sdp: answerDescription.sdp,
          };

          db.ref("match/" + matchId + "/u2").update({
            r: answer,
          });

          pc.onmessage = (ev) => {
            console.log(ev);
          };
          // offerCandidates.onSnapshot((snapshot) => {
          //   snapshot.docChanges().forEach((change) => {
          //     console.log(change);
          //     if (change.type === 'added') {
          //       let data = change.doc.data();
          //       pc.addIceCandidate(new RTCIceCandidate(data));
          //     }
          //   });
          // });
          */
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

            setAnotherID(res.u1.u);

            ////////////////////////////////////////////////////////////////
            // const peer = new Peer({ initiator: false, trickle: false, stream });

            // peer.on("signal", (data) => {
            //   db.ref("match/" + matchId + "/u2").update({
            //     s: data,
            //   });
            // });

            // // peer.on('stream', (currentStream) => {
            // //   userVideo.current.srcObject = currentStream;
            // // });

            // peer.signal(res.u1?.s);
            /***************************/
            /*
            pc.onicecandidate = (event) => {
              console.log(event);
              // event.candidate && answerCandidates.add(event.candidate.toJSON());
            };

            const offerDescription = res.u1?.r;
            await pc.setRemoteDescription(
              new RTCSessionDescription(offerDescription)
            );

            const answerDescription = await pc.createAnswer();
            await pc.setLocalDescription(answerDescription);

            const answer = {
              type: answerDescription.type,
              sdp: answerDescription.sdp,
            };

            db.ref("match/" + matchId + "/u2").update({
              r: answer,
            });

            pc.onmessage = (ev) => {
              console.log(ev);
            };
            */
          }
        }
      } else {
        console.log("No game");
      }
      setMatchIdChecked(true);
    });
  }, [matchId, currentUser, subscribeToMatch]);

  return (
    <>
      {matchIdChecked ? (
        match ? (
          <div className="playground">
            <div className="left">
              <button
                onClick={() => {
                  console.log("5");
                  console.log(send("789"));
                }}
              >
                send
              </button>
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
                me={me}
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
