import React from "react";
import { useAuth } from "contexts/auth";
import shortid from "shortid";
const Home = () => {
  const { signOut } = useAuth();

  const startLinkGame = () => {
    alert(shortid.generate());
  };
  return (
    <>
      <h1>Home</h1>
      <button onClick={signOut}>signOut</button>

      <br />
      <br />

      <button onClick={startLinkGame}>start Game</button>
    </>
  );
};

export default Home;
