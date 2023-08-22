import React from "react";
import Button from "../components/Button";

const StartPage = () => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-cover flex justify-center items-center start-page">
      <div className="flex flex-col items-center gap-2 border-2 border-solid border-gray-800 bg-black/75 text-white max-w-screen-sm w-full m-auto p-10 justify-center ">
        <h1 className=" text-4xl mb-5 ">Tetris</h1>
        <div className="flex flex-col items-center mb-5">
          <span>2023</span>
          <span>3815ICT</span>
          <span>7805ICT</span>
        </div>
        <ul className="flex flex-col items-center mb-5">
          <li className="flex px-1 ">Arjan Dangol (s5295636)</li>
          <li>Mausham Kafle (s5274346)</li>
          <li>Sannat Vatsyan (s5245843)</li>
        </ul>
        <div className=" w-2/5 ">
          <Button name={"Play"} />
          <Button name={"Score"} />
          <Button name={"Configure"} />
          {/* <Button name={"Exit"} /> */}
        </div>
      </div>
    </div>
  );
};

export default StartPage;
