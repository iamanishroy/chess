import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "contexts/auth";
import { useSnackbar } from "react-simple-snackbar";
import img_board from "./assets/chess-board.svg";
import "./style.scss";

const Auth = () => {
  const [openSnackbar] = useSnackbar();
  const {
    currentUser,
    signInWithGoogle,
    signInWithFacebook,
    signInWithMicrosoft,
  } = useAuth();

  async function signIn(provider) {
    let status = false;
    switch (provider) {
      case "google":
        status = await signInWithGoogle();
        break;
      case "facebook":
        status = await signInWithFacebook();
        break;
      case "microsoft":
        status = await signInWithMicrosoft();
        break;
      default:
        status = await signInWithGoogle();
    }
    if (status.success) {
      return openSnackbar("Signed In Successfully!!");
    } else {
      return openSnackbar(status.message);
    }
  }
  return (
    <>
      {currentUser ? (
        <Redirect to="/" />
      ) : (
        <>
          <div className="auth">
            <div className="main">
              <div className="left">
                <div className="top">
                  <div className="logo">
                    <div className="better">better</div>
                    <div className="chess">chess</div>
                  </div>
                  <div className="theme"></div>
                </div>
                <div className="text">
                  Play <b>Chess</b> with a <b>Better</b> Experience and video
                  and voice chat...
                </div>
                <div className="disclaimer">
                  This is an experimental project not for commercial use.
                </div>
                <div className="call_to_action">
                  <div className="login_buttons">
                    <div
                      className="login_button google_login_button"
                      onClick={() => {
                        signIn("google");
                      }}
                    >
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 54 54"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M50.6274 27.5247C50.6274 25.5822 50.4665 24.1647 50.1184 22.6947H27.4845V31.4621H40.7701C40.5024 33.6409 39.0559 36.9222 35.8416 39.1271L35.7965 39.4206L42.953 44.8537L43.4488 44.9022C48.0023 40.7809 50.6274 34.7171 50.6274 27.5247Z"
                          fill="#4285F4"
                        />
                        <path
                          d="M27.483 50.625C33.9919 50.625 39.4561 48.5249 43.4473 44.9025L35.8401 39.1273C33.8044 40.5185 31.0722 41.4898 27.483 41.4898C21.1081 41.4898 15.6975 37.3686 13.7687 31.6723L13.486 31.6959L6.04467 37.3397L5.94736 37.6048C9.91159 45.3223 18.0544 50.625 27.483 50.625Z"
                          fill="#34A853"
                        />
                        <path
                          d="M13.7701 31.6724C13.2612 30.2025 12.9667 28.6273 12.9667 26.9999C12.9667 25.3723 13.2612 23.7974 13.7433 22.3274L13.7299 22.0143L6.19526 16.2799L5.94874 16.3948C4.31489 19.5974 3.37738 23.1937 3.37738 26.9999C3.37738 30.8062 4.31489 34.4023 5.94874 37.6048L13.7701 31.6724Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M27.4832 12.5099C32.0099 12.5099 35.0634 14.4262 36.8046 16.0275L43.6081 9.5175C39.4297 5.71126 33.992 3.375 27.4832 3.375C18.0545 3.375 9.91161 8.67746 5.94736 16.3949L13.742 22.3275C15.6975 16.6312 21.1082 12.5099 27.4832 12.5099Z"
                          fill="#EB4335"
                        />
                      </svg>
                      <p>Continue with Google</p>
                    </div>
                    <div
                      className="login_button facebook_login_button"
                      onClick={() => {
                        signIn("facebook");
                      }}
                    >
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 54 54"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M48.0221 50.63C49.4622 50.63 50.63 49.4622 50.63 48.0217V5.98309C50.63 4.54245 49.4623 3.375 48.0221 3.375H5.98311C4.54245 3.375 3.375 4.54245 3.375 5.98309V48.0217C3.375 49.462 4.54227 50.63 5.98311 50.63H48.0221Z"
                          fill="#3C5A99"
                        />
                        <path
                          d="M35.9803 50.63V32.3303H42.1227L43.0424 25.1985H35.9803V20.6454C35.9803 18.5806 36.5537 17.1735 39.5146 17.1735L43.2911 17.1718V10.7931C42.6379 10.7062 40.3962 10.5121 37.7881 10.5121C32.3432 10.5121 28.6155 13.8356 28.6155 19.9391V25.1985H22.4573V32.3303H28.6155V50.63H35.9803Z"
                          fill="white"
                        />
                      </svg>
                      <p>Continue with Facebook</p>
                    </div>
                    <div
                      className="login_button microsoft_login_button"
                      onClick={() => {
                        signIn("microsoft");
                      }}
                    >
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 54 54"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="28.6875"
                          y="28.6875"
                          width="16.875"
                          height="16.875"
                          fill="#FEBA08"
                        />
                        <rect
                          x="8.4375"
                          y="28.6875"
                          width="16.875"
                          height="16.875"
                          fill="#05A6F0"
                        />
                        <rect
                          x="28.6875"
                          y="8.4375"
                          width="16.875"
                          height="16.875"
                          fill="#80BC06"
                        />
                        <rect
                          x="8.4375"
                          y="8.4375"
                          width="16.875"
                          height="16.875"
                          fill="#F25325"
                        />
                      </svg>
                      <p>Continue with Microsoft</p>
                    </div>
                  </div>
                </div>
                <p className="credit">Made with 💛 by Anish Roy</p>
              </div>
              <div className="right">
                <img src={img_board} alt="img_board" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Auth;
