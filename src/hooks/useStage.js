import { useState } from "react";
import { createStage } from "../utils/gameHelper";

export const useStage = () => {
  const [stage, setStage] = useState(createStage());

  return [stage, setStage];
};
