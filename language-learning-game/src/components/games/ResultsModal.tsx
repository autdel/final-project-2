import React from 'react';
import { useGameState } from '../state/game';
import '../styles/resultsModal.css';

interface ResultsModalProps {
  isOpen: boolean;
  onRestart: () => void;
  onExit: () => void;
  matches: number;
  misses: number;
  timeRemaining: number;
  totalTime: number;
  isWin: boolean;
}

const ResultsModal: React.FC<ResultsModalProps> = ({
  isOpen,
  onRestart,
  onExit,
  matches,
  misses,
  timeRemaining,
  totalTime,
  isWin
}) => {
  const { wordCount } = useGameState();
  if (!isOpen) return null;
  
  const accuracy = matches > 0 ? Math.round((matches / (matches + misses)) * 100) : 0;
  const timeUsed = totalTime - timeRemaining;
  const minutes = Math.floor(timeUsed / 60);
  const seconds = timeUsed % 60;
  const timeFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
  return (
    <div className="modal-backdrop">
      <div className="results-modal">
        <div className="modal-header">
          <h2 className="modal-title">
            {isWin ? 'Great Job!' : 'Time\'s Up!'}
          </h2>
        </div>
        
        <div className="modal-content">
          <div className="result-item">
            <span className="result-label">Result:</span>
            <span className={`result-value ${isWin ? 'success' : 'failure'}`}>
              {isWin ? 'YOU WIN!' : 'You lost :('}
            </span>
          </div>
          
          <div className="result-item">
            <span className="result-label">Matches:</span>
            <span className="result-value">{matches} / {wordCount}</span>
          </div>
          
          <div className="result-item">
            <span className="result-label">Misses:</span>
            <span className="result-value">{misses}</span>
          </div>
          
          <div className="result-item">
            <span className="result-label">Accuracy:</span>
            <span className="result-value">{accuracy}%</span>
          </div>
          
          <div className="result-item">
            <span className="result-label">Time:</span>
            <span className="result-value">{timeFormatted}</span>
          </div>
          
          <div className="result-item">
            <span className="result-label">Time Remaining:</span>
            <span className="result-value">
              {timeRemaining > 0 ? `${timeRemaining} seconds` : 'None'}
            </span>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="smaller-btn bg-red" onClick={onExit}>
            Exit Game
          </button>
          <button className="smaller-btn" onClick={onRestart}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;