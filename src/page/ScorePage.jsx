import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

import useHighScores from "../hooks/useHighScore";

const ScorePage = () => {
  const navigate = useNavigate();
  const [highScores] = useHighScores();
  const goToStartPage = () => {
    navigate("/");
  };
  let counter = 0;
  return (
    <div className="w-screen h-screen overflow-hidden bg-cover flex justify-center items-center start-page">
      <div className="flex flex-col items-center gap-2 border-2 border-solid border-gray-800 bg-black/75 text-white max-w-screen-sm w-full m-auto px-10 py-16 h-full ">
        <h1 className=" text-4xl mb-10 ">High Scores</h1>
        <ul className=" w-3/4 mb-8 ">
          <li className="flex justify-between mb-3">
            <span className=" text-2xl text-amber-300 ">Name</span>
            <span className=" text-2xl text-amber-300 ">Score</span>
          </li>
          {highScores.map((scoreData) => (
            <li className="flex justify-between" key={scoreData.id}>
              <span>
                {++counter}. {scoreData.name}
              </span>
              <span>{scoreData.score}</span>
            </li>
          ))}
        </ul>
        <div className="flex w-full justify-center">
          <Button name="Back" callback={goToStartPage} />
        </div>
      </div>
    </div>
  );
};

export default ScorePage;
