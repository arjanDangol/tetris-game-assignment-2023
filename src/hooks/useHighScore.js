import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "highScores";
const MAX_SCORES = 10;

const useHighScores = () => {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    // Load data from localStorage when component mounts
    const storedHighScores = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );
    if (storedHighScores) {
      setHighScores(storedHighScores);
    }
  }, []);

  const updateHighScores = ({ id, name, score }) => {
    const newScore = { id, name, score: String(score) };
    const updatedScores = [...highScores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_SCORES);
    setHighScores(updatedScores);
    // Store updated high scores in localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedScores));
  };

  return [highScores, updateHighScores];
};

export default useHighScores;
