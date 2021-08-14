import React from "react";
import Peer from "simple-peer";

function Test() {
  const callUser = () => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
    });
    peer.on("signal", (data) => {
      console.log(data);
    });

    // peer.on("data", (stream) => {
    //   console.log(stream);
    // });
  };

  //   const answerCall = () => {
  //     setCallAccepted(true);
  //     const peer = new Peer({
  //       initiator: false,
  //       trickle: false,
  //       stream: stream,
  //     });
  //     peer.on("signal", (data) => {
  //       socket.emit("answerCall", { signal: data, to: caller });
  //     });
  //     peer.on("stream", (stream) => {
  //       userVideo.current.srcObject = stream;
  //     });

  //     peer.signal(callerSignal);
  //     connectionRef.current = peer;
  //   };

  //   const leaveCall = () => {
  //     setCallEnded(true);
  //     connectionRef.current.destroy();
  //   };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#fff" }}>Zoomish</h1>
      <button onClick={callUser}>call</button>
    </>
  );
}

export default Test;
