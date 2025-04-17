export interface VocabularyItem {
  id: string;
  word: string;
  translation: string;
}

// Define game states
export type GameStatus = 'loading' | 'countdown' | 'playing' | 'completed' | 'error';
export type GameType = 'matching' | 'flashcard' | 'sentence' | null;

// Parameters for loadVocabulary
export interface VocabularyParams {
  topic?: string;
  language?: string;
  wordCount?: number;
  difficulty?: string;
}

// Define the state structure
export interface GameState {
  gameType: GameType;
  language: string;
  difficulty: string;
  wordCount: number;
  topic: string;
  vocabularyItems: VocabularyItem[];
  status: GameStatus;
  score: number;
  timeLimit: number;
  timeRemaining: number;
  matches: number;
  misses: number;
  error: string | null;
  startTime: number | null;
  endTime: number | null;
}

// Define possible actions
export type GameAction =
  | { type: 'INITIALIZE_GAME'; payload: Partial<GameState> }
  | { type: 'SET_VOCABULARY'; payload: VocabularyItem[] }
  | { type: 'START_COUNTDOWN' }
  | { type: 'START_GAME' }
  | { type: 'END_GAME' }
  | { type: 'UPDATE_SCORE'; payload: number }
  | { type: 'UPDATE_TIME_REMAINING'; payload: number }
  | { type: 'INCREMENT_MATCHES' }
  | { type: 'INCREMENT_MISSES' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'RESET_GAME' }
  | { type: 'CLEAR_GAME_STATE' };

// Game context interface
export interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  loadVocabulary: (overrideParams?: VocabularyParams) => Promise<void>;
  startCountdown: () => void;
  startGame: () => void;
  endGame: () => void;
  updateTimeRemaining: (time: number) => void;
  incrementMatches: () => void;
  incrementMisses: () => void;
  resetGame: () => void;
  clearGameState: () => void;
}