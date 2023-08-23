import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Score = () => {
  const navigate = useNavigate();
  const goToStartPage = () => {
    navigate("/");
  };
  return (
    <div className="w-screen h-screen overflow-hidden bg-cover flex justify-center items-center start-page">
      <div className="flex flex-col items-center gap-2 border-2 border-solid border-gray-800 bg-black/75 text-white max-w-screen-sm w-full m-auto px-10 py-16 h-full ">
        <h1 className=" text-4xl mb-10 ">High Scores</h1>
        <ul className=" w-3/4 mb-8 ">
          <li className="flex justify-between mb-3">
            <span className=" text-2xl text-amber-300 ">Name</span>
            <span className=" text-2xl text-amber-300 ">Score</span>
          </li>
          <li className="flex justify-between">
            <span>1. Player 1</span>
            <span>1900</span>
          </li>
          <li className="flex justify-between">
            <span>2. Player 2</span>
            <span>1600</span>
          </li>
          <li className="flex justify-between">
            <span>3. Player 3</span>
            <span>1500</span>
          </li>
          <li className="flex justify-between">
            <span>4. Player 4</span>
            <span>1400</span>
          </li>
          <li className="flex justify-between">
            <span>5. Player 5</span>
            <span>1000</span>
          </li>
          <li className="flex justify-between">
            <span>6. Player 6</span>
            <span>800</span>
          </li>
          <li className="flex justify-between">
            <span>7. Player 7</span>
            <span>700</span>
          </li>
          <li className="flex justify-between">
            <span>8. Player 8</span>
            <span>600</span>
          </li>
          <li className="flex justify-between">
            <span>9. Player 9</span>
            <span>400</span>
          </li>
          <li className="flex justify-between">
            <span>10. Player 10</span>
            <span>300</span>
          </li>
        </ul>
        <div className="flex w-full justify-center">
          <Button name="Back" callback={goToStartPage} />
        </div>
      </div>
    </div>
  );
};

export default Score;
