import React, { useEffect, useState } from "react";
import { useAuth } from "contexts/auth";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import startLinkGame from "functions/startGame";
import "./style.scss";

const Home = () => {
  const history = useHistory();
  const [openSnackbar] = useSnackbar();
  const [btnText, setBtnText] = useState("Start Game");
  const { currentUser, signOut } = useAuth();
  useEffect(() => {
    let link_matchId = sessionStorage.getItem("link-matchId");
    if (link_matchId) {
      history.push("/play/" + link_matchId);
      sessionStorage.removeItem("link-matchId");
    }
  }, [history]);
  const startGameWithLink = () => {
    setBtnText("Creating Room...");
    startLinkGame(currentUser)
      .then((matchId) => {
        if (matchId) {
          openSnackbar("Room Created Successfully!!");
          history.push("/play/" + matchId);
        } else {
          openSnackbar("Some Error Occurred!!");
        }
        setBtnText("Start Game");
      })
      .catch(() => {
        openSnackbar("Some Error Occurred!!");
        setBtnText("Start Game");
      });
  };
  return (
    <>
      <div className="home">
        <div className="profile">
          <div className="left">
            <img src={currentUser.photoURL} alt={currentUser.displayName} />
          </div>
          <div className="right">
            <h2>
              {currentUser.displayName} <span onClick={signOut}>🚪</span>
            </h2>
            <h3>{currentUser.email}</h3>
            {/* <p>12 matches played</p>
            <p>12 matches won</p> */}
          </div>
        </div>
        <div className="cta">
          <button onClick={startGameWithLink}>{btnText}</button>
        </div>
      </div>
    </>
  );
};

export default Home;
