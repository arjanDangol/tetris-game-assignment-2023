import React, { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { createStage, checkCollision } from "../utils/gameHelper";

// Custom Hooks
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus";
import useHighScores from "../hooks/useHighScore";
import { TETROMINOS, TETROMINOS_EXTENDED } from "../utils/tetrominos";
import { randomTetromino } from "../utils/tetrominos";
import useGameConfig from "../hooks/useGameConfig";

// Styled components
import {
  StyledTetrisWrapper,
  StyledTetris,
} from "../components/styles/StyledTetris";
import { StyledCell } from "../components/styles/StyledCell";

import gameOverSound from "../utils/gameOverSound.mp3";
import rowsClearedSound from "../utils/rowsClearedSound.mp4";

// Components
import Stage from "../components/Stage";
import Display from "../components/Display";
import Button from "../components/Button";

const gameSettings = {
  score: "0",
  rows: "0",
  level: "1",
  game: "Normal",
  mode: "Player",
  group: "11",
};

const TetrisPage = ({ callback }) => {
  // const gameOverAudio = new Audio(gameOverSound);
  // const rowsClearedSound = new Audio(rowsClearedSound);
  const navigate = useNavigate();
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [highScoreOpen, setHighScoreOpen] = useState(false);
  const [gameConfig, updateGameConfig] = useGameConfig();

  const [player, updatePlayerPos, resetPlayer, playerRotate, setPlayer] = usePlayer(localStorage.getItem("gameConfig"));
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);

  const [highScores, updateHighScores] = useHighScores();
  const [playerName, setPlayerName] = useState("");
  const [nextTetromino, setNextTetromino] = useState(randomTetromino(localStorage.getItem("gameConfig").gameType));
  
  useEffect(() => {
    const storedGameConfig = JSON.parse(localStorage.getItem("gameConfig"));
    console.log({ storedGameConfig });
    if (storedGameConfig) {
      updateGameConfig(storedGameConfig);
    }
    setLevel(parseInt(storedGameConfig.level))
    console.log({gameConfig})
    if (storedGameConfig) {
      if (storedGameConfig.gameType === "normal") {
        const newTetromino = {tetromino: TETROMINOS[0].shape}
        setPlayer({ ...player, ...newTetromino });
      } else {
        const newTetromino = {tetromino: TETROMINOS_EXTENDED[0].shape}
        setPlayer({ ...player, ...newTetromino });
      }
    }
  }, []);

  useEffect(() => {
    setLevel(parseInt(gameConfig.level));
    console.log({gameConfig})
  }, [gameConfig]);

  useEffect(() => {
    console.log({level})
  }, [level]);


  const toggleEndModal = () => {
    setExitModalOpen(!exitModalOpen);
  };

  const toggleHighScoreModal = () => {
    setHighScoreOpen(!highScoreOpen);
    if (highScoreOpen && score > 0) {
      navigate("/");
    }
  };

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(parseInt(gameConfig.level));
  };

  const drop = () => {
    // Increase level when player has cleared 2 rows
    if (rows > (level) * 2) {
      setLevel((prev) => prev + 1);
    }
    // Also increase speed
    setDropTime(1000 / (level + 1) + 200);

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
      // if (player.pos.y === 0 && player) {
      //   console.log("y position: ", player.pos.y);
      //   updateNextTetromino();
      // }
    } else {
      // Game Over
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const togglePauseMode = () => {
    if (!isPaused) {
      setDropTime(1000);
    } else {
      setDropTime(null);
    }
    setIsPaused(!isPaused);
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (!isPaused) {
        togglePauseMode();
      }
      if (keyCode === 37) {
        // Move block left press "left key"
        movePlayer(-1);
      } else if (keyCode === 39) {
        // Move block right press "right key"
        movePlayer(1);
      } else if (keyCode === 40) {
        // Move block down press "down key"
        dropPlayer();
      } else if (keyCode === 38) {
        // Rotate block press "up key"
        playerRotate(stage, 1);
      } else if (keyCode === 80) {
        // Pause game press "P key"
        togglePauseMode();
      }
    }
    if (keyCode === 27) {
      // Toggle exit game modal press "Esc key"
      toggleEndModal();
    }
  };
  useEffect(() => {
    if (!gameOver && (isPaused || !exitModalOpen)) {
      togglePauseMode();
    }
  }, [exitModalOpen]);

  useInterval(() => {
    drop();
  }, dropTime);

  const endGame = () => {
    setGameOver(true);
    // navigate("/");
  };

  const submitHighScore = () => {
    const newScore = {
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID for the new score
      name: playerName,
      score: score, // Random score for demonstration
    };
    updateHighScores(newScore);
    navigate("/score");
  };

  useEffect(() => {
    if (gameOver) {
      toggleHighScoreModal();
      const gameOverAudio = new Audio(gameOverSound);
      gameOverAudio.loop = false; // Loop the background music
      gameOverAudio.play(); // Play background music if it's on

      // Clean up audio element when the component unmounts or music status changes
      return () => {
        gameOverAudio.pause();
        gameOverAudio.currentTime = 0; // Reset music playback position
      };
    }
  }, [gameOver]);

  // // Update next tetromino when player's Y position is less than 1
  // useEffect(() => {
  //   if (player.pos.y < 1) {
  //     setNextTetromino(randomTetromino());
  //   }
  // }, [player.pos.y]);

  // // Handle dropping the tetromino every second
  // useInterval(() => {
  //   updateNextTetromino();
  //   // Drop the current tetromino
  //   if (!checkCollision(player, stage, { x: 0, y: 1 })) {
  //     updatePlayerPos({ x: 0, y: 1, collided: false });
  //   } else {
  //     // Lock the tetromino in the stage if it collides
  //     updatePlayerPos({ x: 0, y: 0, collided: true });
  //     // Generate a new random tetromino for the player
  //     resetPlayer();
  //   }
  // }, 1000);
  useEffect(() => {
    if (rowsCleared > 0) {
      const rowsClearedAudio = new Audio(rowsClearedSound);
      rowsClearedAudio.loop = false; // Loop the background music
      rowsClearedAudio.play(); // Play background music if it's on

      // Clean up audio element when the component unmounts or music status changes
      // return () => {
      //   rowsClearedAudio.pause();
      //   rowsClearedAudio.currentTime = 0; // Reset music playback position
      // };
    }
  }, [rowsCleared]);

  return (
    <>
      <StyledTetrisWrapper
        role="button"
        tabIndex="0"
        onKeyDown={(e) => move(e)}
        onKeyUp={keyUp}
      >
        <StyledTetris>
          <Stage stage={stage} />
          <div className="flex flex-col ml-8">
            {/* <div className="w-full h-full bg-black border-gray-700 border-2 mb-8 grid text-white next-block-container relative">
              <div className="absolute left-5 top-1"> Next Blocks </div>
              {nextTetromino.next.shape.map((row, y) =>
                row.map((cell, x) => (
                  <StyledCell
                    key={x + y * 2}
                    type={cell === 0 ? 0 : nextTetromino.next.shape[y][x]}
                    color={cell === 0 ? "0, 0, 0" : nextTetromino.next.color}
                  />
                ))
              )}
            </div> */}
            <div className="w-full h-full bg-black border-gray-700 border-2 mb-8 grid text-white next-block-container relative">
              <div className="absolute left-5 top-1"> Next Blocks </div>
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={"I"} color={TETROMINOS["I"].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={"I"} color={TETROMINOS["I"].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={"I"} color={TETROMINOS["I"].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={"I"} color={TETROMINOS["I"].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={"I"} color={TETROMINOS["I"].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={"I"} color={TETROMINOS["I"].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={"T"} color={TETROMINOS["T"].color} />
              <StyledCell type={"T"} color={TETROMINOS["T"].color} />
              <StyledCell type={"T"} color={TETROMINOS["T"].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={0} color={TETROMINOS[0].color} />
              <StyledCell type={"T"} color={TETROMINOS["T"].color} />
            </div>
            <Button callback={startGame} name={"Start"} classes="mb-8" />
            <Button callback={toggleEndModal} name={"End"} />
          </div>
          <aside>
            {gameOver ? (
              <Display gameOver={gameOver} text="Game Over" />
            ) : (
              <div>
                <Display text={`Group: ${gameSettings.group}`} />
                <Display text={`Score: ${score}`} />
                <Display text={`Rows: ${rows}`} />
                <Display text={`Level: ${level}`} />
                <Display text={`Game: ${gameConfig.gameType}`} />
                <Display text={`Mode: ${gameConfig.gameMode}`} />
              </div>
            )}
          </aside>
        </StyledTetris>
      </StyledTetrisWrapper>

      {/* Modal Implementation */}
      <Transition appear show={exitModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggleEndModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-600 text-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-center"
                  >
                    Do you want to terminate the game?
                  </Dialog.Title>

                  <div className="mt-10 flex justify-evenly">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={endGame}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={toggleEndModal}
                    >
                      No
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* Modal Implementation */}
      <Transition appear show={highScoreOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={toggleHighScoreModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-600 text-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-center"
                  >
                    High Score
                  </Dialog.Title>
                  {score > 0 && (
                    <div className="mt-4">
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100 focus:ring-blue-500 focus:border-blue-500 text-black"
                        placeholder="Enter your name"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                      />
                    </div>
                  )}
                  {score === 0 && (
                    <div className="mt-4">
                      <p>Your score is 0. Please try again.</p>
                    </div>
                  )}

                  <div className="mt-10 flex justify-evenly">
                    {score > 0 && (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={submitHighScore}
                      >
                        Submit
                      </button>
                    )}
                    {score === 0 && (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          toggleHighScoreModal();
                          startGame();
                        }}
                      >
                        Start Over
                      </button>
                    )}

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        toggleHighScoreModal();
                        navigate("/");
                      }}
                    >
                      Exit Game
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default TetrisPage;
