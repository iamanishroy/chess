import React, { useState, useEffect, useRef } from "react";
import getUserMedia from "getusermedia";

import "./style.scss";
const Details = ({ user1, user2 }) => {
  // console.log("rendered");
  // const [localStream, setLocalStream] = useState();
  const [stream, setStream] = useState();
  const localVideo = useRef();
  const remoteVideo = useRef();

  useEffect(() => {
    getUserMedia((err, stream) => {
      if (err) {
        console.log(err);
        return;
      } else {
        setStream(stream);
        localVideo.current.srcObject = stream;
        console.log(stream);
      }
    });
  }, []);

  return (
    <>
      <div className="panel">
        <div className="users">
          <div className="user">
            <div className="bar">
              <div className="profile">
                <div className="picture">
                  <img src={user1.p} alt={user1.n} />
                </div>
                <div className="text">
                  <div className="name">{user1.n}</div>
                  <div className="status">{user1.o}</div>
                </div>
              </div>
              <div className="actions">
                <button>🔊</button>
                <button>📷</button>
              </div>
            </div>
            <div className="video">
              <video
                id="webcamVideo"
                ref={localVideo}
                autoPlay
                playsInline
              ></video>
            </div>
          </div>
          <div className="user">
            <div className="bar">
              <div className="profile">
                <div className="picture">
                  <img src={user1.p} alt={user1.n} />
                </div>
                <div className="text">
                  <div className="name">{user1.n}</div>
                  <div className="status">{user1.o}</div>
                </div>
              </div>
              <div className="actions">
                <button>🔊</button>
                <button>📷</button>
              </div>
            </div>
            <div className="video">
              <video
                id="webcamVideo"
                ref={localVideo}
                autoPlay
                playsInline
              ></video>
            </div>
          </div>
        </div>

        {/* <p>uid: {user1.u}</p> */}
      </div>
      {/* {user2 && (
        <div>
          <img src={user2.p} alt="" height="150px" width="150px" />
          <p>name: {user2.n}</p>
          <p>status: {user2.o}</p>
          <p>uid: {user2.u}</p>
        </div>
      )}
      turn: you */}
    </>
  );
};

export default Details;
