import { useState, useCallback, useEffect } from "react";
import { TETROMINOS,TETROMINOS_EXTENDED, randomTetromino } from "../utils/tetrominos";
import { STAGE_WIDTH_10, STAGE_WIDTH_12, STAGE_WIDTH_14, checkCollision } from "../utils/gameHelper";
import useGameConfig from "../hooks/useGameConfig";

export const usePlayer = (gameConfig) => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    // tetromino: TETROMINOS_EXTENDED[0].shape,
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  // useEffect(() => {
  //   if (gameConfig) {
  //     if (gameConfig.gameType === "normal") {
  //       const newTetromino = {tetromino: TETROMINOS[0].shape}
  //       setPlayer({ ...player, ...newTetromino });
  //     } else {
  //       const newTetromino = {tetromino: TETROMINOS_EXTENDED[0].shape}
  //       setPlayer({ ...player, ...newTetromino });
  //     }
  //   }
  // }, []);
 // useEffect(() => {
  //   const populationSize = Math.floor(Math.random() * (50 - 20 + 1)) + 20; // Random number between 20 and 50
  //   const maxGenerations = Math.floor(Math.random() * (200 - 100 + 1)) + 100; // Random number between 100 and 200
  //   const createPopulation = (populationSize, numberOfGenes) => {
  //     let population = [];
  //     for (let i = 0; i < populationSize; i++) {
  //       let candidateSolution = [];
  //       for (let j = 0; j < numberOfGenes; j++) {
  //         // Generate a random gene (1 or 0) for the candidate solution
  //         let gene = Math.random() < 0.5 ? 0 : 1;
  //         candidateSolution.push(gene);
  //       }
  //       population.push(candidateSolution);
  //     }
  //     return population;
  //   };

  //   const evaluateFitness = (population) => {
  //     // Implement your logic to evaluate the fitness of each candidate solution
  //     // Return fitness scores as an array
  //     let fitnessScores = [];
  //     for (let solution of population) {
  //       // Calculate fitness: count the number of ones in the solution
  //       let fitness = solution.reduce((acc, gene) => acc + gene, 0);
  //       fitnessScores.push(fitness);
  //     }
  //     return fitnessScores;
  //   };
    

  //   const selection = (population, fitnessScores) => {
  //     // Implement your logic to select candidates based on their fitness
  //     // Return selected parents as an array
  //     let selectedParents = [];
    
  //     // Calculate total fitness of the population
  //     const totalFitness = fitnessScores.reduce((acc, fitness) => acc + fitness, 0);
    
  //     // Create a roulette wheel by calculating probabilities
  //     const probabilities = fitnessScores.map(fitness => fitness / totalFitness);
    
  //     // Spin the roulette wheel to select parents
  //     for (let _ = 0; _ < population.length; _++) {
  //       let pointer = Math.random(); // Random number between 0 and 1
  //       let accumulatedProbability = 0;
    
  //       for (let i = 0; i < probabilities.length; i++) {
  //         accumulatedProbability += probabilities[i];
  //         if (pointer <= accumulatedProbability) {
  //           selectedParents.push(population[i]);
  //           break;
  //         }
  //       }
  //     }
    
  //     return selectedParents;
  //   };
    

  //   const crossover = (parent1, parent2) => {
  //     // Check if parent1 and parent2 are valid arrays
  //     if (!Array.isArray(parent1) || !Array.isArray(parent2)) {
  //         throw new Error("Invalid parents for crossover");
  //     }
  
  //     // Choose a random crossover point within the valid range of parents' lengths
  //     const crossoverPoint = Math.floor(Math.random() * Math.min(parent1.length, parent2.length));
  
  //     // Create children by combining parent genes
  //     const child1 = [...parent1.slice(0, crossoverPoint), ...parent2.slice(crossoverPoint)];
  //     const child2 = [...parent2.slice(0, crossoverPoint), ...parent1.slice(crossoverPoint)];
  
  //     return [child1, child2];
  // };
  
    

  //   const mutate = (solution) => {
  //     // Determine the mutation rate (probability of mutation per move)
  //     const mutationRate = 0.1; // Adjust this value based on your problem domain
    
  //     // Define possible key codes for Tetris moves
  //     const possibleMoves = [37, 39, 40, 38, 80]; // Left, Right, Down, Up, P
    
  //     // Apply mutation to each move in the solution
  //     for (let i = 0; i < solution.length; i++) {
  //       // Check if mutation should occur for this move
  //       if (Math.random() < mutationRate) {
  //         // Mutate the move (change it to a different valid move)
  //         const randomMoveIndex = Math.floor(Math.random() * possibleMoves.length);
  //         solution[i] = possibleMoves[randomMoveIndex];
  //       }
  //     }
  //   };
    
    

  //   const geneticAlgorithm = (populationSize, maxGenerations) => {
  //     let population = createPopulation(populationSize);
  //     console.log({population})
    
  //     for (let generation = 0; generation < maxGenerations; generation++) {
  //       let fitnessScores = evaluateFitness(population);
  //       let selectedParents = selection(population, fitnessScores);
  //       let offspring = [];
    
  //       for (let i = 0; i < populationSize / 2; i++) {
  //         let parent1 = selectedParents[Math.floor(Math.random() * selectedParents.length)];
  //         let parent2 = selectedParents[Math.floor(Math.random() * selectedParents.length)];
  //         let [child1, child2] = crossover(parent1, parent2);
  //         mutate(child1);
  //         mutate(child2);
  //         offspring.push(child1);
  //         offspring.push(child2);
  //       }
    
  //       population = offspring;
  //     }

  //     let bestSolution = population.reduce((prev, curr) => {
  //       return evaluateFitness(curr) > evaluateFitness(prev) ? curr : prev;
  //     });
    
  //     // Convert bestSolution into a move (x, y) for the Tetris player
  //     let bestMove = bestSolution[0]; // Assuming the best move is the first move in the array
  //     let tetrisMove = { x: 0, y: 0 };
    
  //     // Logic to convert bestMove to tetrisMove based on your requirements
  //     // For example, if bestMove has properties x and y, you can directly assign them:
  //     tetrisMove.x = bestMove.x;
  //     tetrisMove.y = bestMove.y;
    
  //     // Implement more complex logic if needed based on your specific Tetris game mechanics
    
  //     return tetrisMove;
  //   };

  //   const interval = setInterval(() => {
  //     const nextMove = geneticAlgorithm(populationSize, maxGenerations);
  //     setPlayer(prev => ({ ...prev, pos: { x: nextMove.x, y: nextMove.y } }));
  //   }, 1000); // Adjust the interval according to your game speed

  //   return () => clearInterval(interval);
  // }, []);

  const rotate = (matrix, dir) => {
    // Transpose the rows so that they become cols
    const rotatedTetro = matrix.map((_, index) =>
      matrix.map((col) => col[index])
    );
    // Turn the rows around to obtain a rotated matrix.
    if (dir > 0) return rotatedTetro.map((row) => row.reverse());
    return rotatedTetro.reverse();
  };

  // Function to rotate the tetromino using rotate() function
  const playerRotate = (stage, dir) => {
    // Saving the tetromino that needs to be rotated in templorary variable tempPlayer
    const tempPlayer = JSON.parse(JSON.stringify(player));
    tempPlayer.tetromino = rotate(tempPlayer.tetromino, dir);

    const pos = tempPlayer.pos.x;
    let offset = 1;
    while (checkCollision(tempPlayer, stage, { x: 0, y: 0 })) {
      tempPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > tempPlayer.tetromino[0].length) {
        rotate(tempPlayer.tetromino, -dir);
        tempPlayer.pos.x = pos;
        return;
      }
    }

    setPlayer(tempPlayer);
  };

  // Update the position of the tetromino in the stage
  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: prev.pos.x + x, y: prev.pos.y + y },
      collided,
    }));
  };

  // Reset the tetromino position and start from the initial position
  const resetPlayer = useCallback(() => {
    let STAGE_WIDTH;
    if (gameConfig.stageSize === "small") {
      STAGE_WIDTH = STAGE_WIDTH_10;
    } else if (gameConfig.stageSize === "regular") {
      STAGE_WIDTH = STAGE_WIDTH_12;
    } else if (gameConfig.stageSize === "large") {
      STAGE_WIDTH = STAGE_WIDTH_14;
    }
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino(gameConfig.gameType).current.shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate, setPlayer];
};
