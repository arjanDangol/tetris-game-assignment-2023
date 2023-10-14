import { useState, useCallback, useEffect } from "react";
import { TETROMINOS,TETROMINOS_EXTENDED, randomTetromino } from "../utils/tetrominos";
import { STAGE_WIDTH, checkCollision } from "../utils/gameHelper";
import useGameConfig from "../hooks/useGameConfig";

export const usePlayer = (gameConfig) => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    // tetromino: TETROMINOS_EXTENDED[0].shape,
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  // useEffect(() => {
  //   if (gameConfig) {
  //     if (gameConfig.gameType === "normal") {
  //       const newTetromino = {tetromino: TETROMINOS[0].shape}
  //       setPlayer({ ...player, ...newTetromino });
  //     } else {
  //       const newTetromino = {tetromino: TETROMINOS_EXTENDED[0].shape}
  //       setPlayer({ ...player, ...newTetromino });
  //     }
  //   }
  // }, []);

  const rotate = (matrix, dir) => {
    // Transpose the rows so that they become cols
    const rotatedTetro = matrix.map((_, index) =>
      matrix.map((col) => col[index])
    );
    // Turn the rows around to obtain a rotated matrix.
    if (dir > 0) return rotatedTetro.map((row) => row.reverse());
    return rotatedTetro.reverse();
  };

  // Function to rotate the tetromino using rotate() function
  const playerRotate = (stage, dir) => {
    // Saving the tetromino that needs to be rotated in templorary variable tempPlayer
    const tempPlayer = JSON.parse(JSON.stringify(player));
    tempPlayer.tetromino = rotate(tempPlayer.tetromino, dir);

    const pos = tempPlayer.pos.x;
    let offset = 1;
    while (checkCollision(tempPlayer, stage, { x: 0, y: 0 })) {
      tempPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > tempPlayer.tetromino[0].length) {
        rotate(tempPlayer.tetromino, -dir);
        tempPlayer.pos.x = pos;
        return;
      }
    }

    setPlayer(tempPlayer);
  };

  // Update the position of the tetromino in the stage
  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: prev.pos.x + x, y: prev.pos.y + y },
      collided,
    }));
  };

  // Reset the tetromino position and start from the initial position
  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino(gameConfig.gameType).current.shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate, setPlayer];
};
