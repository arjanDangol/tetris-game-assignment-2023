import React from "react";
import Stage from "../components/Stage";
import Display from "../components/Display";
import StartButton from "../components/StartButton";
import { createStage } from "../utils/gameHelper";
import {
  StyledTetrisWrapper,
  StyledTetris,
} from "../components/styles/StyledTetris";

const Tetris = ({ callback }) => {
  return (
    <StyledTetrisWrapper>
      <StyledTetris>
        <Stage stage={createStage()} />
        <aside>
          <div>
            <Display text="Score" />
            <Display text="Rows" />
            <Display text="Level" />
          </div>
          <StartButton />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
