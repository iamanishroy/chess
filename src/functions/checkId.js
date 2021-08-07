import { db } from "adapter";
import Chess from "chess.js";

const checkId = async (matchId) => {
  try {
    let snapshot = await db.ref("match/" + matchId).once("value");
    if (snapshot.val()) {
      const matchData = snapshot.val();
      const game = new Chess(matchData.fen);

      return {
        over: game.game_over(),
        u1: matchData.u1,
        u2: matchData.u2,
        matchId: matchId,
        fen: matchData.fen,
      };
    } else {
      return false;
    }
  } catch (er) {
    console.log(er);
    return false;
  }
};

export default checkId;
