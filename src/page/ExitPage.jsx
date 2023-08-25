import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const ExitPage = () => {
  const navigate = useNavigate();

  const goToGamePage = () => {
    navigate("/");
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-cover flex justify-center items-center start-page">
      <div className="flex flex-col items-center justify-center gap-2 border-2 border-solid border-gray-800 bg-black/75 text-white max-w-screen-sm w-full m-auto px-10 py-16 h-full ">
        <div className=" w-2/5 text-center ">
          <Button name={"Go Back To Game"} callback={goToGamePage} />
        </div>
      </div>
    </div>
  );
};

export default ExitPage;
