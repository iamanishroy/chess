import React from "react";
import "./style.scss";
const Board = () => {
  return (
    <>
      <div class="chess-table">
        <div id="h8" class="piece-box black-box"></div>
        <div id="g8" class="piece-box white-box"></div>
        <div id="f8" class="piece-box black-box"></div>
        <div id="e8" class="piece-box white-box"></div>
        <div id="d8" class="piece-box black-box"></div>
        <div id="c8" class="piece-box white-box"></div>
        <div id="b8" class="piece-box black-box"></div>
        <div id="a8" class="piece-box white-box"></div>

        <div id="h7" class="piece-box white-box"></div>
        <div id="g7" class="piece-box black-box"></div>
        <div id="f7" class="piece-box white-box"></div>
        <div id="e7" class="piece-box black-box"></div>
        <div id="d7" class="piece-box white-box"></div>
        <div id="c7" class="piece-box black-box"></div>
        <div id="b7" class="piece-box white-box"></div>
        <div id="a7" class="piece-box black-box"></div>

        <div id="h6" class="piece-box black-box"></div>
        <div id="g6" class="piece-box white-box"></div>
        <div id="f6" class="piece-box black-box"></div>
        <div id="e6" class="piece-box white-box"></div>
        <div id="d6" class="piece-box black-box"></div>
        <div id="c6" class="piece-box white-box"></div>
        <div id="b6" class="piece-box black-box"></div>
        <div id="a6" class="piece-box white-box"></div>

        <div id="h5" class="piece-box white-box"></div>
        <div id="g5" class="piece-box black-box"></div>
        <div id="f5" class="piece-box white-box"></div>
        <div id="e5" class="piece-box black-box"></div>
        <div id="d5" class="piece-box white-box"></div>
        <div id="c5" class="piece-box black-box"></div>
        <div id="b5" class="piece-box white-box"></div>
        <div id="a5" class="piece-box black-box"></div>

        <div id="h4" class="piece-box black-box"></div>
        <div id="g4" class="piece-box white-box"></div>
        <div id="f4" class="piece-box black-box"></div>
        <div id="e4" class="piece-box white-box"></div>
        <div id="d4" class="piece-box black-box"></div>
        <div id="c4" class="piece-box white-box"></div>
        <div id="b4" class="piece-box black-box">
          {/* <img src="./pieces/PawnWhite.svg" alt=""> */}
        </div>
        <div id="a4" class="piece-box white-box"></div>

        <div id="h3" class="piece-box white-box"></div>
        <div id="g3" class="piece-box black-box"></div>
        <div id="f3" class="piece-box white-box"></div>
        <div id="e3" class="piece-box black-box"></div>
        <div id="d3" class="piece-box white-box"></div>
        <div id="c3" class="piece-box black-box"></div>
        <div id="b3" class="piece-box white-box"></div>
        <div id="a3" class="piece-box black-box"></div>

        <div id="h2" class="piece-box black-box"></div>
        <div id="g2" class="piece-box white-box"></div>
        <div id="f2" class="piece-box black-box"></div>
        <div id="e2" class="piece-box white-box"></div>
        <div id="d2" class="piece-box black-box"></div>
        <div id="c2" class="piece-box white-box"></div>
        <div id="b2" class="piece-box black-box"></div>
        <div id="a2" class="piece-box white-box"></div>

        <div id="h1" class="piece-box white-box"></div>
        <div id="g1" class="piece-box black-box"></div>
        <div id="f1" class="piece-box white-box"></div>
        <div id="e1" class="piece-box black-box"></div>
        <div id="d1" class="piece-box white-box"></div>
        <div id="c1" class="piece-box black-box"></div>
        <div id="b1" class="piece-box white-box"></div>
        <div id="a1" class="piece-box black-box">
          {/* <img src="./pieces/PawnBlack.svg" alt=""> */}
        </div>
      </div>
    </>
  );
};

export default Board;
