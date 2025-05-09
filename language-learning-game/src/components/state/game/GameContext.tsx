// src/contexts/game/GameContext.tsx
import { createContext } from 'react';
import { GameContextType } from './gameTypes';
import { initialState } from './gameReducer';

const defaultContextValue: GameContextType = {
  state: initialState,
  dispatch: () => null,
  loadVocabulary: async () => {},
  startCountdown: () => {},
  startGame: () => {},
  endGame: () => {},
  updateTimeRemaining: () => {},
  incrementMatches: () => {},
  incrementMisses: () => {},
  resetGame: () => {},
  clearGameState: () => {}
};

// Create the context
const GameContext = createContext<GameContextType>(defaultContextValue);

export default GameContext;