import React from "react";
import Stage from "../components/Stage";
import Display from "../components/Display";
import StartButton from "../components/StartButton";

const Tetris = ({ callback }) => {
  return (
    <div>
      <Stage />
      <aside>
        <div>
          <Display text="Score" />
          <Display text="Rows" />
          <Display text="Level" />
        </div>
        <StartButton />
      </aside>
    </div>
  );
};

export default Tetris;
