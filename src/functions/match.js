import { db } from "adapter";

const updateFEN = (matchId, fen, last) => {
  db.ref("match/" + matchId + "/brd").update({
    fen: fen,
    l: last,
  });
};

export default updateFEN;
