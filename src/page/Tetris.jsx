import React, { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { createStage, checkCollision } from "../utils/gameHelper";

// Custom Hooks
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

// Styled components
import {
  StyledTetrisWrapper,
  StyledTetris,
} from "../components/styles/StyledTetris";

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

const Tetris = ({ callback }) => {
  const navigate = useNavigate();
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [exitModalOpen, setExitModalOpen] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  const toggleExitModal = () => {
    setExitModalOpen(!exitModalOpen);
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
  };

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
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
        setDropTime(1000);
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
      toggleExitModal();
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
    navigate("/");
  };

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
          <aside>
            {gameOver ? (
              <Display gameOver={gameOver} text="Game Over" />
            ) : (
              <div>
                <Display text={`Group: ${gameSettings.group}`} />
                <Display text={`Score: ${gameSettings.score}`} />
                <Display text={`Rows: ${gameSettings.rows}`} />
                <Display text={`Level: ${gameSettings.level}`} />
                <Display text={`Game: ${gameSettings.game}`} />
                <Display text={`Mode: ${gameSettings.mode}`} />
              </div>
            )}
            <Button callback={startGame} name={"Start"} />
            <Button callback={toggleExitModal} name={"Exit"} />
          </aside>
        </StyledTetris>
      </StyledTetrisWrapper>

      {/* Modal Implementation */}
      <Transition appear show={exitModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggleExitModal}>
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
                      Oh Yeah!
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={toggleExitModal}
                    >
                      Hell No!
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

export default Tetris;
