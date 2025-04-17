// src/components/games/GameTimer.tsx
import React from 'react';
import './GameTimer.css';

interface GameTimerProps {
  time: number;
}

const GameTimer: React.FC<GameTimerProps> = ({ time }) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const timerClass = `game-timer ${time < 10 ? 'warning' : ''}`;
  
  return (
    <div className={timerClass}>
      <div className="timer-icon">⏱️</div>
      <div className="timer-text">{formattedTime}</div>
    </div>
  );
};

export default GameTimer;