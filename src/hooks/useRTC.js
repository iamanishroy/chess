// not in use
import { useState, useEffect } from "react";
// import Peer from "peerjs";

let once = true;
export default function useRTC(uid) {
  console.log(uid);
  const [connected, setConnected] = useState(false);
  const [data, setData] = useState("false");
  const [myID, setMyID] = useState("");
  const [anotherID, setAnotherID] = useState("");
  const [conn, setConn] = useState();
  console.log("l");
  const [peer, setPeer] = useState();
  if (once) {
    setPeer(new Peer());
    once = false;
  }
  useEffect(() => {
    if (peer) {
      peer.on("open", function (id) {
        setMyID(id);
        console.log("My peer ID is: " + id);
      });
      peer.on("connection", (conn) => {
        console.log("c", conn);
        conn.on("error", (e) => {
          console.log(e);
        });
        conn.on("open", () => {
          console.log("h");
          setConnected(true);
        });
        conn.on("close", () => {
          setConnected(false);
        });
        conn.on("data", (data) => {
          console.log(data);
          setData(data);
        });
      });
    }
  }, [peer]);
  useEffect(() => {
    console.log(anotherID);
    if (anotherID.trim() !== "") {
      setConn(peer.connect(anotherID));
    }
  }, [anotherID]);

  useEffect(() => {
    if (conn) {
      console.log("c", conn);
      conn.on("error", (e) => {
        console.log(e);
      });
      conn.on("open", () => {
        console.log("h");
        setConnected(true);
      });
      conn.on("close", () => {
        setConnected(false);
      });
      conn.on("data", (data) => {
        console.log(data);
        setData(data);
        conn.send("yo");
      });
    }
  }, [conn]);
  const send = (str) => {
    if (connected) {
      console.log(str);
      conn.send(str);
      return true;
    } else {
      console.log(conn);
      return false;
    }
  };

  return [myID, setAnotherID, send, data, connected];
}
