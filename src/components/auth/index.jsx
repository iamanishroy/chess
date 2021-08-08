import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "contexts/auth";
import { useSnackbar } from "react-simple-snackbar";

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
    if (status) {
      return openSnackbar("Signed In Successfully!!");
    } else {
      return openSnackbar("Unexpected Error Occurred!!");
    }
  }
  return (
    <>
      {currentUser ? (
        <Redirect to="/" />
      ) : (
        <>
          <h1>Auth</h1>
          <button
            onClick={() => {
              signIn("google");
            }}
          >
            google
          </button>
          <br />
          <button
            onClick={() => {
              signIn("facebook");
            }}
          >
            facebook
          </button>
          <br />
          <button
            onClick={() => {
              signIn("microsoft");
            }}
          >
            microsoft
          </button>
        </>
      )}
    </>
  );
};

export default Auth;
