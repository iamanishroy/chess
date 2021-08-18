import { db } from "adapter";
import shortid from "shortid";

const startLinkGame = (user) => {
  //   console.log(user);
  //   B-NNGN4A1
  let matchId = shortid.generate();
  return db
    .ref("match/" + matchId)
    .set({
      u1: {
        u: user.uid,
        p: user.photoURL,
        n: user.displayName,
      },
      brd: {
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        l: null,
      },
    })
    .then(() => {
      return matchId;
    })
    .catch(() => {
      // handel error
      return false;
    });
};

export default startLinkGame;
