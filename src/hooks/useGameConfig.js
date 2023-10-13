// useGameConfig.js
import { useEffect, useState } from "react";

const useGameConfig = () => {
  const configData = {
    gameType: "normal",
    stageSize: "regular",
    speed: "normal",
    gameMode: "player",
    level: "1",
  };
  const [gameConfig, setGameConfig] = useState({
    gameType: "",
    stageSize: "",
    speed: "",
    gameMode: "",
    level: "",
  });

  const updateGameConfig = (newConfig) => {
    setGameConfig({ ...gameConfig, ...newConfig });
  };

  useEffect(() => {
    const storedGameConfig = JSON.parse(localStorage.getItem("gameConfig"));
    if (storedGameConfig) {
      setGameConfig(storedGameConfig);
    } else {
      setGameConfig(configData);
    }
  }, []);

  return [gameConfig, updateGameConfig];
};

export default useGameConfig;
