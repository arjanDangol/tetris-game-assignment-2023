import React from "react";
import { Route, Routes } from "react-router-dom";
import StartPage from "./page/StartPage";
import TetrisPage from "./page/TetrisPage";
import ScorePage from "./page/ScorePage";
import ConfigurePage from "./page/ConfigurePage";
import ExitPage from "./page/ExitPage";

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route exact path="/game" element={<TetrisPage />} />
      <Route exact path="/score" element={<ScorePage />} />
      <Route exact path="/configure" element={<ConfigurePage />} />
      <Route exact path="/exit-page" element={<ExitPage />} />
    </Routes>
  </div>
);

export default App;
