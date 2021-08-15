import { db } from "adapter";
import visibility from "visibilityjs";

const setSecondUser = (matchId, user) => {
  return db
    .ref("match/" + matchId)
    .update({
      u2: {
        u: user.uid,
        n: user.displayName,
        p: user.photoURL,
        o: "online",
      },
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

const presence = (matchId, user) => {
  const updatePresence = (state) => {
    db.ref("match/" + matchId + "/" + user).update({
      o: state,
    });
  };
  if (visibility.state() === "visible") {
    updatePresence("online");
  } else {
    updatePresence("away");
  }
  visibility.change((e, state) => {
    if (state === "visible") {
      updatePresence("online");
    } else if (state === "hidden") {
      updatePresence("away");
    }
  });
  db.ref(".info/connected").on("value", (snapshot) => {
    if (snapshot.val()) {
      updatePresence("online");
    } else {
      updatePresence("offline");
    }
  });
  db.ref("match/" + matchId + "/" + user)
    .onDisconnect()
    .update({ o: "offline" });
};

export { presence };
export default setSecondUser;
