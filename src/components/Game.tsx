'use client'

import React, { useState, useEffect } from 'react';
import Balloon from './Balloon';

const TARGET_SCORE = 30; // Score to win

const Game: React.FC = () => {
  const [score, setScore] = useState(0);
  const [balloons, setBalloons] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [hideButton, setHideButton] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalloons((prev) => [...prev, Date.now()]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePopWithDelay = (id: number) => {
    // Delay the balloon removal by a short duration (500ms)
    setTimeout(() => {
      setScore((prev) => prev + 1);
      setBalloons((prev) => prev.filter((balloon) => balloon !== id));
  
      if (score + 1 >= TARGET_SCORE) {
        setGameOver(true);
        setStartGame(false);
      }
    }, 500); // Same duration as the shake animation
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {gameOver && (
        <div className="relative">
          {/* Animated Emoji with Text */}
          <div className="animate-bounce text-6xl mt-4">
            🎉
          </div>
          <h2 className="text-6xl mt-4">
          Міша, папа і мама вітає тебе з Днем Народження
          </h2>
        </div>
      )}
      
      {!hideButton && (
        <button
          className="border p-2 rounded-lg mt-[150px]"
          onClick={() => {
            setStartGame(true);
            setHideButton(true);
          }}
        >
          ПОЧАТИ
        </button>
      )}

      {/* Progress Bar in the top-right corner */}
      <div className="absolute flex justify-center top-4 left-1/2 transform -translate-x-1/2 w-[80%] sm:w-[400px] h-8 bg-gray-300 rounded-full">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            score <= 10
              ? 'bg-red-500'
              : score <= 20
              ? 'bg-yellow-400'
              : 'bg-green-500'
          }`}
          style={{
            width: `${(score / TARGET_SCORE) * 100}%`, // Fill progress based on score (out of TARGET_SCORE)
          }}
        >
            <div className='text-black text-2xl flex justify-center text-center'>{score}</div>
        </div>
      </div>

      {/* Balloon container centered */}
      <div className="w-full flex justify-center items-start overflow-hidden">
        {/* Only render balloons when the game is not over and the game has started */}
        {!gameOver && startGame && balloons.map((id) => (
          <Balloon key={id} id={id} onPop={() => handlePopWithDelay(id)} onPopWithDelay={handlePopWithDelay} />
        ))}
      </div>
    </div>
  );
};

export default Game;
