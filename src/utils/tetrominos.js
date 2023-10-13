// Variable that stores the shape and color for random TETRIMINOS
// Generates random tetromino from above variable
// export const randomTetromino = () => {
//   const tetrominos = "IJLOSTZ";
//   const randTetromino =
//     tetrominos[Math.floor(Math.random() * tetrominos.length)];
//   return TETROMINOS[randTetromino];
// };

export const TETROMINOS = {
  0: { shape: [[0]], color: "0, 0, 0" },
  I: {
    shape: [
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
    ],
    color: "80, 227, 230",
  },
  J: {
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0],
    ],
    color: "36, 95, 223",
  },
  L: {
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"],
    ],
    color: "223, 173, 36",
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"],
    ],
    color: "223, 217, 36",
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
      [0, 0, 0],
    ],
    color: "48, 211, 56",
  },
  T: {
    shape: [
      [0, 0, 0],
      ["T", "T", "T"],
      [0, "T", 0],
    ],
    color: "132, 61, 198",
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
      [0, 0, 0],
    ],
    color: "227, 78, 78",
  },
};

export const TETROMINOS_EXTENDED = {
  0: { shape: [[0]], color: "0, 0, 0" },
  I: {
    shape: [
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
    ],
    color: "80, 227, 230",
  },
  J: {
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0],
    ],
    color: "36, 95, 223",
  },
  L: {
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"],
    ],
    color: "223, 173, 36",
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"],
    ],
    color: "223, 217, 36",
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
      [0, 0, 0],
    ],
    color: "48, 211, 56",
  },
  T: {
    shape: [
      [0, 0, 0],
      ["T", "T", "T"],
      [0, "T", 0],
    ],
    color: "132, 61, 198",
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
      [0, 0, 0],
    ],
    color: "227, 78, 78",
  },
  Q: {
    shape: [
      [0, "L", 0],
      [0, "L", "L"],
      [0, 0, 0],
    ],
    color: "223, 173, 36",
  },
  W: {
    shape: [
      [0, "I", 0],
      [0, "I", 0],
      [0, "I", 0],
    ],
    color: "80, 227, 230",
  },
};
export const randomTetromino = () => {
  // const storedGameConfig = JSON.parse(localStorage.getItem("gameConfig"));
  const tetrominos = "IJLOSTZ";
  // const tetrominosExtended = "IJLOSTZQW";
  const randTetromino =
    tetrominos[Math.floor(Math.random() * tetrominos.length)];
  // const randTetrominoExtended =
  //   tetrominosExtended[Math.floor(Math.random() * tetrominosExtended.length)];
  const tetromino = TETROMINOS[randTetromino];
  // const tetrominoExtended = TETROMINOS[randTetrominoExtended];
  return {
    current: tetromino,
    next: tetromino,
  };
};
