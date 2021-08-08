import React, { useEffect } from "react";
import { useAuth } from "contexts/auth";
import { useHistory } from "react-router-dom";
import startLinkGame from "functions/startGame";
const Home = () => {
  const history = useHistory();
  const { currentUser, signOut } = useAuth();
  useEffect(() => {
    let link_matchId = sessionStorage.getItem("link-matchId");
    if (link_matchId) {
      history.push("/play/" + link_matchId);
      sessionStorage.removeItem("link-matchId");
    }
  }, [history]);
  const startGameWithLink = () => {
    startLinkGame(currentUser)
      .then((matchId) => {
        if (matchId) {
          alert(matchId);
          history.push("/play/" + matchId);
        } else {
          console.log("error");
        }
      })
      .catch(() => {
        console.log("err");
      });
  };
  return (
    <>
      <h1>Home</h1>
      <button onClick={signOut}>signOut</button>

      <br />
      <br />

      <button onClick={startGameWithLink}>start Game</button>
    </>
  );
};

export default Home;
