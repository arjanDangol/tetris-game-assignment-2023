import React from "react";
import { Route, Routes } from "react-router-dom";
import StartPage from "./page/StartPage";
import Tetris from "./page/Tetris";
import Score from "./page/Score";
import Configure from "./page/Configure";
import ExitPage from "./page/ExitPage";

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route exact path="/game" element={<Tetris />} />
      <Route exact path="/score" element={<Score />} />
      <Route exact path="/configure" element={<Configure />} />
      <Route exact path="/exit-page" element={<ExitPage />} />
    </Routes>
  </div>
);

export default App;
