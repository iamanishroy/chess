import React, { useState, useEffect, useRef, useMemo } from "react";
import { useAuth } from "contexts/auth";
import useOnlineStatus from "hooks/useOnlineStatus";
import { db } from "adapter";
import useScreenSize from "hooks/useScreenSize";
import Peer from "peerjs";
import ModalShare from "../popup";
import micOn from "./assets/mic-on.svg";
import micOff from "./assets/mic-off.svg";
import videoOn from "./assets/video-on.svg";
import videoOff from "./assets/video-off.svg";
import "./style.scss";

const User = ({
  userNo,
  matchId,
  me,
  stream,
  localAudio,
  localVideo,
  setLocalAudio,
  setLocalVideo,
}) => {
  const { currentUser } = useAuth();
  const [playerPhotoURL, setPlayerPhotoURL] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerStatus, setPlayerStatus] = useState("");

  const online = useOnlineStatus();
  const video = useRef();

  const [remoteVideo, setRemoteVideo] = useState(false);
  const [remoteAudio, setRemoteAudio] = useState(false);

  const [screenType] = useScreenSize();

  const toggleStream = (type) => {
    if (me === userNo) {
      if (type === 0) {
        setLocalVideo(
          screenType.tablet || screenType.phone ? false : !localVideo
        );
      } else {
        setLocalAudio(!localAudio);
      }
    } else {
      if (type === 0) {
        setRemoteVideo(
          screenType.tablet || screenType.phone ? false : !remoteVideo
        );
      } else {
        setRemoteAudio(!remoteAudio);
      }
    }
  };

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
    if (me !== userNo && stream) {
      try {
        stream.getAudioTracks()[0].enabled =
          screenType.tablet || screenType.phone ? false : remoteAudio;
        stream.getVideoTracks()[0].enabled = remoteVideo;
      } catch (e) {}
    }
    video.current.srcObject = stream;
  }, [stream, me, userNo, remoteAudio, remoteVideo, screenType]);
  return (
    <div className="user">
      <div className="bar">
        <div className="profile">
          <div className="picture">
            <img src={playerPhotoURL} alt={playerName} />
          </div>
          <div className="text">
            <div className="name">{playerName}</div>
            <div
              className="status"
              style={{
                color:
                  playerStatus === "online"
                    ? "green"
                    : playerStatus === "offline"
                    ? "red"
                    : "coral",
              }}
            >
              {playerStatus}
            </div>
          </div>
        </div>
        <div className="actions">
          <button
            onClick={() => {
              toggleStream(1);
            }}
          >
            {(me === userNo && localAudio) || (me !== userNo && remoteAudio) ? (
              <img src={micOn} alt="mic-on" />
            ) : (
              <img src={micOff} alt="mic-off" />
            )}
          </button>
          {!screenType.tablet && !screenType.phone && (
            <button
              onClick={() => {
                toggleStream(0);
              }}
            >
              {(me === userNo && localVideo) ||
              (me !== userNo && remoteVideo) ? (
                <img src={videoOn} alt="video-on" />
              ) : (
                <img src={videoOff} alt="video-off" />
              )}
            </button>
          )}
        </div>
      </div>
      {me !== userNo && localVideo}
      <div
        className="video"
        style={{
          display: screenType.tablet || screenType.phone ? "none" : "unset",
        }}
      >
        <video
          id="webcamVideo"
          ref={video}
          autoPlay
          playsInline
          muted={me === userNo}
        ></video>
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

  const [localVideo, setLocalVideo] = useState(false);
  const [localAudio, setLocalAudio] = useState(false);

  const [screenType] = useScreenSize();

  useEffect(() => {
    if (me === 1) {
      if (user1Stream) {
        try {
          user1Stream.getVideoTracks()[0].enabled =
            screenType.tablet || screenType.phone ? false : localVideo;
        } catch (e) {}
      }
    } else {
      if (user2Stream) {
        try {
          user2Stream.getVideoTracks()[0].enabled = localVideo;
        } catch (e) {}
      }
    }
  }, [localVideo, me, user1Stream, user2Stream, screenType]);
  useEffect(() => {
    if (me === 1) {
      if (user1Stream) {
        user1Stream.getAudioTracks()[0].enabled =
          screenType.tablet || screenType.phone ? false : localAudio;
      }
    } else {
      if (user2Stream) {
        user2Stream.getAudioTracks()[0].enabled = localAudio;
      }
    }
  }, [localAudio, me, user1Stream, user2Stream, screenType]);
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
              .getUserMedia({ video: localVideo, audio: true })
              .then((stream) => {
                setUser1Stream(stream);
                const call = peer.call(u2.u, stream);
                call.on("stream", (remoteStream) => {
                  setUser2Stream(remoteStream);
                });
              })
              .catch(() => {});
          } else {
            peer.on("call", (call) => {
              navigator.mediaDevices
                .getUserMedia({ video: localVideo, audio: true })
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
  }, [matchId, me, peer, localAudio, localVideo]);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  return (
    <>
      <div className="panel">
        <div className="tab">
          <span>match id : {matchId}</span>
          <span
            onClick={() => {
              setShareModalOpen(true);
            }}
          >
            invite
          </span>
        </div>
        <ModalShare open={shareModalOpen} setOpen={setShareModalOpen} />
        <div className="users">
          {me === 2 && (
            <User
              userNo={1}
              matchId={matchId}
              me={me}
              stream={user1Stream}
              localAudio={localAudio}
              setLocalAudio={setLocalAudio}
              localVideo={localVideo}
              setLocalVideo={setLocalVideo}
            />
          )}
          {u2 && (
            <User
              userNo={2}
              matchId={matchId}
              me={me}
              stream={user2Stream}
              localAudio={localAudio}
              setLocalAudio={setLocalAudio}
              localVideo={localVideo}
              setLocalVideo={setLocalVideo}
            />
          )}
          {me === 1 && (
            <User
              userNo={1}
              matchId={matchId}
              me={me}
              stream={user1Stream}
              localAudio={localAudio}
              setLocalAudio={setLocalAudio}
              localVideo={localVideo}
              setLocalVideo={setLocalVideo}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Details;
