import { useContext } from 'react';
import GameContext from '../state/game/GameContext';
import { GameState, GameAction } from '../state/game/gameTypes';

// hook to access the full game context
export const useGame = () => {
  const context = useContext(GameContext);
  
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  
  return context;
};

// accessing only the game state
export const useGameState = (): GameState => {
  const { state } = useGame();
  return state;
};

// dispatching game actions
export const useGameDispatch = (): React.Dispatch<GameAction> => {
  const { dispatch } = useGame();
  return dispatch;
};

// loading vocabulary
export const useLoadVocabulary = () => {
  const { loadVocabulary } = useGame();
  return loadVocabulary;
};

// starting game countdown
export const useStartCountdown = () => {
  const { startCountdown } = useGame();
  return startCountdown;
};

// starting the game
export const useStartGame = () => {
  const { startGame } = useGame();
  return startGame;
};

// ending the game
export const useEndGame = () => {
  const { endGame } = useGame();
  return endGame;
};

// updating remaining time
export const useUpdateTimeRemaining = () => {
  const { updateTimeRemaining } = useGame();
  return updateTimeRemaining;
};

// Hook for incrementing matches
export const useIncrementMatches = () => {
  const { incrementMatches } = useGame();
  return incrementMatches;
};

// incrementing misses
export const useIncrementMisses = () => {
  const { incrementMisses } = useGame();
  return incrementMisses;
};

// resetting the game
export const useResetGame = () => {
  const { resetGame } = useGame();
  return resetGame;
};

// clearing game state
export const useClearGameState = () => {
  const { clearGameState } = useGame();
  return clearGameState;
};