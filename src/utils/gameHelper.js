export const STAGE_WIDTH_10 = 10;
export const STAGE_HEIGHT_18 = 18;
export const STAGE_WIDTH_12 = 12;
export const STAGE_HEIGHT_20 = 20;
export const STAGE_WIDTH_14 = 14;
export const STAGE_HEIGHT_22 = 22;

// Function to create the stage with array of array
export const createStage = (stageSize) =>{
  let STAGE_HEIGHT, STAGE_WIDTH;
  if (stageSize === "small") {
    STAGE_WIDTH = STAGE_WIDTH_10;
    STAGE_HEIGHT = STAGE_HEIGHT_18;
  } else if (stageSize === "regular") {
    STAGE_WIDTH = STAGE_WIDTH_12;
    STAGE_HEIGHT = STAGE_HEIGHT_20;
  } else if (stageSize === "large") {
    STAGE_WIDTH = STAGE_WIDTH_14;
    STAGE_HEIGHT = STAGE_HEIGHT_22;
  }
  return Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );
}
  

// Function to detect if there is any collision between the blocks
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  // Using for loops to be able to return (and break)
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[0].length; x += 1) {
      // 1. Check that we're on an actual Tetromino cell
      if (player.tetromino[y][x] !== 0) {
        if (
          // 2. Check that our move is inside the game areas height (y)
          // That we're not go through bottom of the play area
          !stage[y + player.pos.y + moveY] ||
          // 3. Check that our move is inside the game areas width (x)
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // 4. Check that the cell wer'e moving to isn't set to clear
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            "clear"
        ) {
          return true;
        }
      }
    }
  }
};
