import { GameState, GameAction } from './gameTypes';

// Helper to calculate time limit based on word count
export const calculateTimeLimit = (wordCount: number): number => {
  switch (wordCount) {
    case 5: return 30;
    case 10: return 60;
    case 15: return 90;
    case 20: return 120;
    default: return 60;
  }
};

// Initial state
export const initialState: GameState = {
  gameType: null,
  language: '',
  difficulty: '',
  wordCount: 0,
  topic: '',
  vocabularyItems: [],
  status: 'loading',
  timeLimit: 0,
  timeRemaining: 0,
  matches: 0,
  misses: 0,
  error: null,
  startTime: null,
  endTime: null,
};

// The reducer function
export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'INITIALIZE_GAME': { 
      const wordCount = action.payload.wordCount || 5;
      const timeLimit = calculateTimeLimit(wordCount);
      
      return {
        ...initialState,
        ...action.payload,
        status: 'loading',
        timeLimit,
        timeRemaining: timeLimit,
      }; 
    }
    
    case 'SET_VOCABULARY':
      return {
        ...state,
        vocabularyItems: action.payload,
        status: 'countdown',
      };
    
    case 'START_COUNTDOWN':
      return {
        ...state,
        status: 'countdown',
      };
      
    case 'START_GAME':
      return {
        ...state,
        status: 'playing',
        startTime: Date.now(),
      };
    
    case 'END_GAME':
      return {
        ...state,
        status: 'completed',
        endTime: Date.now(),
      };
    
    case 'UPDATE_TIME_REMAINING':
      // Check if time is up
      if (action.payload <= 0) {
        return {
          ...state,
          timeRemaining: 0,
          status: 'completed',
          endTime: Date.now(),
        };
      }
      
      return {
        ...state,
        timeRemaining: action.payload,
      };
    
    case 'INCREMENT_MATCHES':
      return {
        ...state,
        matches: state.matches + 1,
      };
    
    case 'INCREMENT_MISSES':
      return {
        ...state,
        misses: state.misses + 1,
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        status: 'error',
      };
    
    case 'RESET_GAME':
      return {
        ...state,
        status: 'countdown',
        timeRemaining: state.timeLimit,
        matches: 0,
        misses: 0,
        error: null,
        startTime: null,
        endTime: null,
      };
    
    case 'CLEAR_GAME_STATE':
      return initialState;
      
    default:
      return state;
  }
}