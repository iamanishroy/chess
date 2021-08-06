import {
  RookWhite,
  RookBlack,
  BishopBlack,
  BishopWhite,
  KingBlack,
  KingWhite,
  KnightBlack,
  KnightWhite,
  QueenBlack,
  QueenWhite,
  PawnBlack,
  PawnWhite,
} from "./pieces";

const DEFAULT_POSITIONS = {
  E1: "K",
  D1: "Q",
  A1: "R",
  H1: "R",
  C1: "B",
  F1: "B",
  B1: "N",
  G1: "N",
  A2: "P",
  B2: "P",
  C2: "P",
  D2: "P",
  E2: "P",
  F2: "P",
  G2: "P",
  H2: "P",
  E8: "k",
  D8: "q",
  A8: "r",
  H8: "r",
  C8: "b",
  F8: "b",
  B8: "n",
  G8: "n",
  A7: "p",
  B7: "p",
  C7: "p",
  D7: "p",
  E7: "p",
  F7: "p",
  G7: "p",
  H7: "p",
};

const getImage = (p) => {
  switch (p) {
    case "p":
      return <PawnBlack />;
    case "P":
      return <PawnWhite />;
    case "k":
      return <KingBlack />;
    case "K":
      return <KingWhite />;
    case "q":
      return <QueenBlack />;
    case "Q":
      return <QueenWhite />;
    case "r":
      return <RookBlack />;
    case "R":
      return <RookWhite />;
    case "b":
      return <BishopBlack />;
    case "B":
      return <BishopWhite />;
    case "n":
      return <KnightBlack />;
    case "N":
      return <KnightWhite />;
    default:
      return <></>;
  }
};

const getPieces = (l, i, positions = DEFAULT_POSITIONS) => {
  return <>{getImage(positions[l + i])}</>;
};

export default getPieces;
