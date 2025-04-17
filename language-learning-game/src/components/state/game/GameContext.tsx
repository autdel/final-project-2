// src/contexts/game/GameContext.tsx
import { createContext } from 'react';
import { GameContextType, VocabularyParams } from './gameTypes';
import { initialState } from './gameReducer';

// Create a default context value
const defaultContextValue: GameContextType = {
  state: initialState,
  dispatch: () => null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadVocabulary: async (overrideParams?: VocabularyParams) => {},
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