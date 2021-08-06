import React from "react";
import rw from "./svg/RookWhite.svg";
import rb from "./svg/RookBlack.svg";
import bw from "./svg/BishopWhite.svg";
import bb from "./svg/BishopBlack.svg";
import kw from "./svg/KingWhite.svg";
import kb from "./svg/KingBlack.svg";
import pw from "./svg/PawnWhite.svg";
import pb from "./svg/PawnBlack.svg";
import qw from "./svg/QueenWhite.svg";
import qb from "./svg/QueenBlack.svg";
import knw from "./svg/KnightWhite.svg";
import knb from "./svg/KnightBlack.svg";

const RookWhite = () => {
  return <img src={rw} alt="RookWhite" />;
};
const RookBlack = () => {
  return <img src={rb} alt="RookBlack" />;
};

const BishopWhite = () => {
  return <img src={bw} alt="BishopWhite" />;
};
const BishopBlack = () => {
  return <img src={bb} alt="BishopBlack" />;
};

const KingWhite = () => {
  return <img src={kw} alt="KingWhite" />;
};
const KingBlack = () => {
  return <img src={kb} alt="KingBlack" />;
};

const QueenWhite = () => {
  return <img src={qw} alt="QueenWhite" />;
};
const QueenBlack = () => {
  return <img src={qb} alt="QueenBlack" />;
};

const KnightWhite = () => {
  return <img src={knw} alt="KnightWhite" />;
};
const KnightBlack = () => {
  return <img src={knb} alt="KnightBlack" />;
};

const PawnWhite = () => {
  return <img src={pw} alt="PawnWhite" />;
};
const PawnBlack = () => {
  return <img src={pb} alt="PawnBlack" />;
};

export default RookWhite;

export {
  RookBlack,
  RookWhite,
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
};
