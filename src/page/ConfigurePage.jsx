import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RadioGroup } from "@headlessui/react";
import Button from "../components/Button";
import useGameConfig from "../hooks/useGameConfig";

const ConfigurePage = () => {
  const navigate = useNavigate();
  const [gameConfig, updateGameConfig] = useGameConfig();
  // const [gameType, setGameType] = useState("normal");
  // const [stageSize, setStageSize] = useState("regular");
  // const [speed, setSpeed] = useState("normal");
  // const [gameMode, setGameMode] = useState("player");
  // const [level, setLevel] = useState("1");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const storedGameConfig = JSON.parse(localStorage.getItem("gameConfig"));
    if (storedGameConfig) {
      updateGameConfig(storedGameConfig);
    }
  }, []);

  const saveConfig = () => {
    if (isSaved) {
      return false;
    } else {
      setIsSaved(true);
      localStorage.setItem("gameConfig", JSON.stringify(gameConfig));
    }
  };

  const goToStartPage = () => {
    navigate("/");
  };
  useEffect(() => {
    console.log({ gameConfig });
    if (isSaved) {
      setIsSaved(false);
    }
  }, [gameConfig]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-cover flex justify-center items-center start-page">
      <div className="flex flex-col items-center gap-2 border-2 border-solid border-gray-800 bg-black/75 text-white max-w-screen-sm w-full m-auto px-10 py-16 h-full ">
        <h1 className=" text-4xl mb-5 ">Configuration</h1>

        {/* game type */}
        <div className=" w-full mb-8 ">
          <RadioGroup
            className="flex flex-col"
            value={gameConfig.gameType}
            onChange={(value) => updateGameConfig({ gameType: value })}
          >
            <RadioGroup.Label className="mb-4 text-amber-300">
              Game Type:
            </RadioGroup.Label>
            <div className="flex">
              <RadioGroup.Option value="normal" className=" mr-4 ">
                {({ checked }) => (
                  <span
                    className={`cursor-pointer p-2 border-4 rounded-lg ${
                      checked
                        ? "bg-orange-700 border-orange-900"
                        : "hover:bg-orange-500 hover:border-orange-900 hover:text-black"
                    }`}
                  >
                    Normal
                  </span>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="extended">
                {({ checked }) => (
                  <span
                    className={`cursor-pointer p-2 border-4 rounded-lg ${
                      checked
                        ? "bg-orange-700 border-orange-900"
                        : "hover:bg-orange-500 hover:border-orange-900 hover:text-black"
                    }`}
                  >
                    Extended
                  </span>
                )}
              </RadioGroup.Option>
            </div>
          </RadioGroup>
        </div>

        {/* stage size */}
        <div className=" w-full mb-8 ">
          <RadioGroup
            className="flex flex-col"
            value={gameConfig.stageSize}
            onChange={(value) => updateGameConfig({ stageSize: value })}
          >
            <RadioGroup.Label className="mb-4 text-amber-300">
              Stage Dimension:
            </RadioGroup.Label>
            <div className="flex">
              <RadioGroup.Option value="small" className=" mr-4 ">
                {({ checked }) => (
                  <span
                    className={`cursor-pointer p-2 border-4 rounded-lg ${
                      checked
                        ? "bg-orange-700 border-orange-900"
                        : "hover:bg-orange-500 hover:border-orange-900 hover:text-black"
                    }`}
                  >
                    10 X 18
                  </span>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="regular" className="mr-4">
                {({ checked }) => (
                  <span
                    className={`cursor-pointer p-2 border-4 rounded-lg ${
                      checked
                        ? "bg-orange-700 border-orange-900"
                        : "hover:bg-orange-500 hover:border-orange-900 hover:text-black"
                    }`}
                  >
                    12 X 20
                  </span>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="large">
                {({ checked }) => (
                  <span
                    className={`cursor-pointer p-2 border-4 rounded-lg ${
                      checked
                        ? "bg-orange-700 border-orange-900"
                        : "hover:bg-orange-500 hover:border-orange-900 hover:text-black"
                    }`}
                  >
                    14 X 22
                  </span>
                )}
              </RadioGroup.Option>
            </div>
          </RadioGroup>
        </div>

        {/* game speed */}
        <div className=" w-full mb-8 ">
          <RadioGroup
            className="flex flex-col"
            value={gameConfig.speed}
            onChange={(value) => updateGameConfig({ speed: value })}
          >
            <RadioGroup.Label className="mb-4 text-amber-300">
              Speed:
            </RadioGroup.Label>
            <div className="flex">
              <RadioGroup.Option value="normal" className=" mr-4 ">
                {({ checked }) => (
                  <span
                    className={`cursor-pointer p-2 border-4 rounded-lg ${
                      checked
                        ? "bg-orange-700 border-orange-900"
                        : "hover:bg-orange-500 hover:border-orange-900 hover:text-black"
                    }`}
                  >
                    Normal
                  </span>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="timesOneAndHalf" className="mr-4">
                {({ checked }) => (
                  <span
                    className={`cursor-pointer p-2 border-4 rounded-lg ${
                      checked
                        ? "bg-orange-700 border-orange-900"
                        : "hover:bg-orange-500 hover:border-orange-900 hover:text-black"
                    }`}
                  >
                    X1.5
                  </span>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="timesTwo">
                {({ checked }) => (
                  <span
                    className={`cursor-pointer p-2 border-4 rounded-lg ${
                      checked
                        ? "bg-orange-700 border-orange-900"
                        : "hover:bg-orange-500 hover:border-orange-900 hover:text-black"
                    }`}
                  >
                    X2
                  </span>
                )}
              </RadioGroup.Option>
            </div>
          </RadioGroup>
        </div>

        {/* game mode */}
        <div className=" w-full mb-8 ">
          <RadioGroup
            className="flex flex-col"
            value={gameConfig.gameMode}
            onChange={(value) => updateGameConfig({ gameMode: value })}
          >
            <RadioGroup.Label className="mb-4 text-amber-300">
              Game Mode:
            </RadioGroup.Label>
            <div className="flex">
              <RadioGroup.Option value="player" className=" mr-4 ">
                {({ checked }) => (
                  <span
                    className={`cursor-pointer p-2 border-4 rounded-lg ${
                      checked
                        ? "bg-orange-700 border-orange-900"
                        : "hover:bg-orange-500 hover:border-orange-900 hover:text-black"
                    }`}
                  >
                    Player
                  </span>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="ai">
                {({ checked }) => (
                  <span
                    className={`cursor-pointer p-2 border-4 rounded-lg ${
                      checked
                        ? "bg-orange-700 border-orange-900"
                        : "hover:bg-orange-500 hover:border-orange-900 hover:text-black"
                    }`}
                  >
                    AI
                  </span>
                )}
              </RadioGroup.Option>
            </div>
          </RadioGroup>
        </div>

        {/* game level */}
        <div className=" w-full mb-8 ">
          <RadioGroup
            className="flex flex-col"
            value={gameConfig.level}
            onChange={(value) => updateGameConfig({ level: value })}
          >
            <RadioGroup.Label className="mb-4 text-amber-300">
              Game Level:
            </RadioGroup.Label>
            <div className="flex">
              <RadioGroup.Option value="1" className=" mr-4 ">
                {({ checked }) => (
                  <span
                    className={`cursor-pointer p-2 border-4 rounded-lg ${
                      checked
                        ? "bg-orange-700 border-orange-900"
                        : "hover:bg-orange-500 hover:border-orange-900 hover:text-black"
                    }`}
                  >
                    1
                  </span>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="2" className=" mr-4 ">
                {({ checked }) => (
                  <span
                    className={`cursor-pointer p-2 border-4 rounded-lg ${
                      checked
                        ? "bg-orange-700 border-orange-900"
                        : "hover:bg-orange-500 hover:border-orange-900 hover:text-black"
                    }`}
                  >
                    2
                  </span>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="3" className=" mr-4 ">
                {({ checked }) => (
                  <span
                    className={`cursor-pointer p-2 border-4 rounded-lg ${
                      checked
                        ? "bg-orange-700 border-orange-900"
                        : "hover:bg-orange-500 hover:border-orange-900 hover:text-black"
                    }`}
                  >
                    3
                  </span>
                )}
              </RadioGroup.Option>
            </div>
          </RadioGroup>
        </div>

        <div className="flex w-full">
          <Button
            name={isSaved ? "Saved" : "Save"}
            isDisabled={isSaved}
            callback={saveConfig}
            classes="mr-4"
          />
          <Button name="Back" callback={goToStartPage} />
        </div>
      </div>
    </div>
  );
};

export default ConfigurePage;
