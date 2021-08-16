import React, { useState, useEffect, useRef, useMemo } from "react";
import { useAuth } from "contexts/auth";
import useOnlineStatus from "hooks/useOnlineStatus";
import { db } from "adapter";
import Peer from "peerjs";
import "./style.scss";

const User = ({ userNo, matchId, me, stream }) => {
  const { currentUser } = useAuth();
  const [playerPhotoURL, setPlayerPhotoURL] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerStatus, setPlayerStatus] = useState("");

  const online = useOnlineStatus();
  const video = useRef();

  useEffect(() => {
    if (userNo === me) {
      setPlayerName(currentUser.displayName);
      setPlayerPhotoURL(currentUser.photoURL);
      setPlayerStatus(online ? "online" : "offline");
    } else {
      db.ref("match/" + matchId + "/u" + userNo).on("value", (snapshot) => {
        if (snapshot.val()) {
          setPlayerName(snapshot.val().n);
          setPlayerPhotoURL(snapshot.val().p);
          setPlayerStatus(snapshot.val().o);
        }
      });
    }
  }, [matchId, me, userNo, online, currentUser]);
  useEffect(() => {
    video.current.srcObject = stream;
  }, [stream]);
  return (
    <div className="user">
      <div className="bar">
        <div className="profile">
          <div className="picture">
            <img src={playerPhotoURL} alt={playerName} />
          </div>
          <div className="text">
            <div className="name">{playerName}</div>
            <div className="status">{playerStatus}</div>
          </div>
        </div>
        <div className="actions">
          <button>🔊</button>
          <button>📷</button>
        </div>
      </div>
      <div className="video">
        <video id="webcamVideo" ref={video} autoPlay playsInline></video>
      </div>
    </div>
  );
};

let u2PrevState = "";
const Details = ({ matchId, me }) => {
  const { currentUser } = useAuth();
  const peer = useMemo(() => new Peer(currentUser.uid), [currentUser]);
  const [u2, setU2] = useState(false);
  const [user1Stream, setUser1Stream] = useState();
  const [user2Stream, setUser2Stream] = useState();
  useEffect(() => {
    db.ref("match/" + matchId + "/u2").on("value", (snapshot) => {
      if (snapshot.val()) {
        setU2(true);
        let u2 = snapshot.val();
        if (
          u2.o === "online" &&
          u2PrevState !== "away" &&
          u2PrevState !== "online"
        ) {
          if (me === 1) {
            // if previous was away then don't call
            navigator.mediaDevices
              .getUserMedia({ video: true, audio: true })
              .then((stream) => {
                setUser1Stream(stream);
                const call = peer.call(u2.u, stream);
                call.on("stream", (remoteStream) => {
                  setUser2Stream(remoteStream);
                });
              });
          } else {
            peer.on("call", (call) => {
              navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then(
                  (stream) => {
                    setUser2Stream(stream);
                    call.answer(stream); // Answer the call with an A/V stream.
                    call.on("stream", (remoteStream) => {
                      setUser1Stream(remoteStream);
                    });
                  },
                  (err) => {
                    console.error("Failed to get local stream", err);
                  }
                );
            });
          }
        }
        u2PrevState = u2.o;
      } else {
        setU2(false);
      }
    });
  }, [matchId, me, peer]);

  return (
    <>
      <div className="panel">
        <div className="tab">
          <span>chat</span>
        </div>

        <div className="users">
          {me === 2 && (
            <User userNo={1} matchId={matchId} me={me} stream={user1Stream} />
          )}
          {u2 && (
            <User userNo={2} matchId={matchId} me={me} stream={user2Stream} />
          )}
          {me === 1 && (
            <User userNo={1} matchId={matchId} me={me} stream={user1Stream} />
          )}
        </div>
      </div>
    </>
  );
};

export default Details;
