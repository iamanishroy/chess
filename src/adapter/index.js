import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
// import "firebase/storage";
// import "firebase/firestore";
const config = {
  apiKey: process.env.REACT_APP_BETTER_CHESS_API_KEY,
  authDomain: process.env.REACT_APP_BETTER_CHESS_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_MAIN_DATABASE_URL,
  projectId: process.env.REACT_APP_BETTER_CHESS_PROJECT_ID,
  storageBucket: process.env.REACT_APP_BETTER_CHESS_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_BETTER_CHESS_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_BETTER_CHESS_APP_ID,
  measurementId: process.env.REACT_APP_BETTER_CHESS_MEASUREMENT_ID,
};

firebase.initializeApp(config);
var auth = firebase.auth;
var db = firebase.database();
// var appstorage = firebase.storage();
export { db, auth };
export default auth;
