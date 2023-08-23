import React from "react";
// import Button from "../components/Button";

const Score = () => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-cover flex justify-center items-center start-page">
      <div className="flex flex-col items-center gap-2 border-2 border-solid border-gray-800 bg-black/75 text-white max-w-screen-sm w-full m-auto px-10 py-16 h-full ">
        <h1 className=" text-4xl mb-10 ">High Scores</h1>
        <ul className=" w-3/4 ">
          <li className="flex justify-between mb-3">
            <span className=" text-2xl ">Name</span>
            <span className=" text-2xl ">Score</span>
          </li>
          <li className="flex justify-between">
            <span>Player 1</span>
            <span>Score</span>
          </li>
          <li className="flex justify-between">
            <span>Player 2</span>
            <span>Score</span>
          </li>
          <li className="flex justify-between">
            <span>Player 3</span>
            <span>Score</span>
          </li>
          <li className="flex justify-between">
            <span>Player 4</span>
            <span>Score</span>
          </li>
          <li className="flex justify-between">
            <span>Player 5</span>
            <span>Score</span>
          </li>
          <li className="flex justify-between">
            <span>Player 6</span>
            <span>Score</span>
          </li>
          <li className="flex justify-between">
            <span>Player 7</span>
            <span>Score</span>
          </li>
          <li className="flex justify-between">
            <span>Player 8</span>
            <span>Score</span>
          </li>
          <li className="flex justify-between">
            <span>Player 9</span>
            <span>Score</span>
          </li>
          <li className="flex justify-between">
            <span>Player 10</span>
            <span>Score</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Score;
