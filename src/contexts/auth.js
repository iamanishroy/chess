import React, { useContext, useState, useEffect } from "react";
import auth from "adapter";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

async function signInWithPopup(provider) {
  try {
    await auth().signInWithPopup(provider);
    return true;
  } catch (e) {
    return false;
  }
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth().createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
  }

  function signOut() {
    return auth().signOut();
  }

  function resetPassword(email) {
    return auth().sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  async function signInWithGoogle() {
    return await signInWithPopup(new auth.GoogleAuthProvider());
  }

  async function signInWithFacebook() {
    return await signInWithPopup(new auth.FacebookAuthProvider());
  }

  async function signInWithMicrosoft() {
    let provider = new auth.OAuthProvider("microsoft.com");
    provider.setCustomParameters({
      prompt: "consent",
    });
    return await signInWithPopup(provider);
  }

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    signOut,
    resetPassword,
    updateEmail,
    updatePassword,
    signInWithGoogle,
    signInWithFacebook,
    signInWithMicrosoft,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
