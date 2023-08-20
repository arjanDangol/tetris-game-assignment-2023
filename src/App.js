import React from "react";
import { Route, Routes } from "react-router-dom";
import StartPage from "./page/StartPage";
import Tetris from "./page/Tetris";

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route exact path="/game" element={<Tetris />} />
    </Routes>
  </div>
);

export default App;
