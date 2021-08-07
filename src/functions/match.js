import { db } from "adapter";

const updateFEN = (matchId, fen) => {
  db.ref("match/" + matchId).update({
    fen: fen,
  });
};

export default updateFEN;
