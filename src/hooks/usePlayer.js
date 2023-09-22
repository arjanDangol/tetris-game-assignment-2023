import { useState, useCallback } from "react";
import { TETROMINOS, randomTetromino } from "../utils/tetrominos";
import { STAGE_WIDTH, checkCollision } from "../utils/gameHelper";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

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
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
