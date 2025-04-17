import { useContext } from 'react';
import GameContext from '../state/game/GameContext';
import { GameState, GameAction } from '../state/game/gameTypes';

// hook for accessing the full game context
export const useGame = () => {
  const context = useContext(GameContext);
  
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  
  return context;
};

// accessing only specific portions of the game
export const useGameState = (): GameState => {
  const { state } = useGame();
  return state;
};

export const useGameDispatch = (): React.Dispatch<GameAction> => {
  const { dispatch } = useGame();
  return dispatch;
};

export const useLoadVocabulary = () => {
  const { loadVocabulary } = useGame();
  return loadVocabulary;
};

export const useStartCountdown = () => {
  const { startCountdown } = useGame();
  return startCountdown;
};

export const useStartGame = () => {
  const { startGame } = useGame();
  return startGame;
};

export const useEndGame = () => {
  const { endGame } = useGame();
  return endGame;
};

export const useUpdateTimeRemaining = () => {
  const { updateTimeRemaining } = useGame();
  return updateTimeRemaining;
};

export const useIncrementMatches = () => {
  const { incrementMatches } = useGame();
  return incrementMatches;
};

export const useIncrementMisses = () => {
  const { incrementMisses } = useGame();
  return incrementMisses;
};

export const useResetGame = () => {
  const { resetGame } = useGame();
  return resetGame;
};

export const useClearGameState = () => {
  const { clearGameState } = useGame();
  return clearGameState;
};