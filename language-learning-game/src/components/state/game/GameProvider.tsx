import React, { ReactNode, useReducer } from 'react';
import { VocabularyItem } from './gameTypes';
import { gameReducer, initialState } from './gameReducer';
import GameContext from './GameContext';
import { generateVocabulary } from '../../../services/aiService';

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Function to load vocabulary based on current settings
  const loadVocabulary = async () => {
    // Add console logs to debug
    console.log('loadVocabulary called with state:', {
      topic: state.topic,
      language: state.language,
      wordCount: state.wordCount,
      difficulty: state.difficulty
    });

    if (!state.topic || !state.language || !state.wordCount) {
      console.error('Missing required game settings:', {
        topic: state.topic,
        language: state.language,
        wordCount: state.wordCount
      });
      
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Missing required game settings' 
      });
      return;
    }

    try {
      // fallback topic
      const topic = isValidTopic(state.topic) ? state.topic : 'school';
      console.log('Using topic:', topic);
      
      // use aiService to get vocab terms
      const generatedItems = await generateVocabulary(
        topic,
        state.language,
        state.wordCount,
        state.difficulty
      );

      // NOTE: previously I used to call the translate api to get the translated data, but it was easier with openAI
      // I kept the api usage on the API Test page for now so you can see that it works.

      console.log('Generated vocabulary items:', generatedItems);

      // add IDs to objects
      const vocabularyItems: VocabularyItem[] = generatedItems.map((item, index) => ({
        id: `item-${index}`,
        word: item.word,
        translation: item.translation,
      }));

      dispatch({ type: 'SET_VOCABULARY', payload: vocabularyItems });
    } catch (error) {
      console.error('Error loading vocabulary:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: `Failed to load vocabulary: ${(error as Error).message}`,
      });
    }
  };

  // check for valid topic
  const isValidTopic = (topic: string): boolean => {
    // Consider a topic valid if it contains at least 3 characters and is mostly letters
    return topic.length >= 3 && /^[A-Za-z\s]+$/.test(topic);
  };

  const startCountdown = () => {
    dispatch({ type: 'START_COUNTDOWN' });
  };

  const startGame = () => {
    dispatch({ type: 'START_GAME' });
  };

  const endGame = () => {
    dispatch({ type: 'END_GAME' });
  };

  const updateTimeRemaining = (time: number) => {
    dispatch({ type: 'UPDATE_TIME_REMAINING', payload: time });
  };

  const incrementMatches = () => {
    dispatch({ type: 'INCREMENT_MATCHES' });
  };

  const incrementMisses = () => {
    dispatch({ type: 'INCREMENT_MISSES' });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };
  
  // needed this to clear game state between games
  const clearGameState = () => {
    dispatch({ type: 'CLEAR_GAME_STATE' });
  };

  // contextinfo
  const contextValue = {
    state,
    dispatch,
    loadVocabulary,
    startCountdown,
    startGame,
    endGame,
    updateTimeRemaining,
    incrementMatches,
    incrementMisses,
    resetGame,
    clearGameState
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};