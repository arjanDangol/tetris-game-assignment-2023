import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Dialog, Transition } from "@headlessui/react";

const StartPage = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const goToGamePage = () => {
    navigate("/game");
  };

  const goToScorePage = () => {
    navigate("/score");
  };

  const goToConfigurePage = () => {
    navigate("/configure");
  };

  const exitGame = () => {
    window.close();
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-cover flex justify-center items-center start-page">
      <div className="flex flex-col items-center gap-2 border-2 border-solid border-gray-800 bg-black/75 text-white max-w-screen-sm w-full m-auto px-10 py-16 h-full ">
        <h1 className=" text-4xl mb-5 ">Tetris</h1>
        <div className="flex flex-col items-center mb-5">
          <span>2023</span>
          <span>3815ICT</span>
          <span>7805ICT</span>
        </div>
        <ul className="flex flex-col items-center mb-5">
          <li>Arjan Dangol (s5295636)</li>
          <li>Mausham Kafle (s5274346)</li>
          <li>Sannat Vatsyan (s5245843)</li>
        </ul>
        <div className=" w-2/5 ">
          <Button name={"Play"} callback={goToGamePage} />
          <Button name={"Score"} callback={goToScorePage} />
          <Button name={"Configure"} callback={goToConfigurePage} />
          <Button name={"Exit"} callback={toggleModal} />
        </div>
      </div>
      {/* Modal Implementation */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggleModal}>
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
                      onClick={exitGame}
                    >
                      Oh Yeah!
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={toggleModal}
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
    </div>
  );
};

export default StartPage;
