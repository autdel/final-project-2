// src/contexts/game/GameContext.tsx
import { createContext } from 'react';
import { GameContextType, VocabularyParams } from './gameTypes';
import { initialState } from './gameReducer';

const defaultContextValue: GameContextType = {
  state: initialState,
  dispatch: () => null,
  // NOTE: I need to revisit this to see if theres a fix for this thing
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