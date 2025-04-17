import { useContext } from 'react';
import GameContext from '../state/game/GameContext';
import { GameState, GameAction } from '../state/game/gameTypes';

// Main hook for accessing the full game context
export const useGame = () => {
  const context = useContext(GameContext);
  
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  
  return context;
};

// Hook for accessing only the game state
export const useGameState = (): GameState => {
  const { state } = useGame();
  return state;
};

// Hook for dispatching game actions
export const useGameDispatch = (): React.Dispatch<GameAction> => {
  const { dispatch } = useGame();
  return dispatch;
};

// Hook for loading vocabulary
export const useLoadVocabulary = () => {
  const { loadVocabulary } = useGame();
  return loadVocabulary;
};

// Hook for starting game countdown
export const useStartCountdown = () => {
  const { startCountdown } = useGame();
  return startCountdown;
};

// Hook for starting the game
export const useStartGame = () => {
  const { startGame } = useGame();
  return startGame;
};

// Hook for ending the game
export const useEndGame = () => {
  const { endGame } = useGame();
  return endGame;
};

// Hook for updating remaining time
export const useUpdateTimeRemaining = () => {
  const { updateTimeRemaining } = useGame();
  return updateTimeRemaining;
};

// Hook for incrementing matches
export const useIncrementMatches = () => {
  const { incrementMatches } = useGame();
  return incrementMatches;
};

// Hook for incrementing misses
export const useIncrementMisses = () => {
  const { incrementMisses } = useGame();
  return incrementMisses;
};

// Hook for resetting the game
export const useResetGame = () => {
  const { resetGame } = useGame();
  return resetGame;
};

// Hook for clearing game state
export const useClearGameState = () => {
  const { clearGameState } = useGame();
  return clearGameState;
};