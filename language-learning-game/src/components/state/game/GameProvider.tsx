import React, { ReactNode, useReducer } from 'react';
import { VocabularyItem, VocabularyParams } from './gameTypes';
import { gameReducer, initialState } from './gameReducer';
import GameContext from './GameContext';
import { generateVocabulary } from '../../../services/aiService';

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Function to load vocabulary based on current settings with optional override
  const loadVocabulary = async (overrideParams?: VocabularyParams) => {
    // Get parameters either from override or from state
    const topic = overrideParams?.topic || state.topic;
    const language = overrideParams?.language || state.language;
    const wordCount = overrideParams?.wordCount || state.wordCount;
    const difficulty = overrideParams?.difficulty || state.difficulty;
    
    console.log('loadVocabulary called with params:', {
      topic, language, wordCount, difficulty
    });

    if (!topic || !language || !wordCount) {
      console.error('Missing required game settings:', {
        topic, language, wordCount
      });
      
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Missing required game settings' 
      });
      return;
    }

    try {
      // Use a fallback topic if the input is gibberish
      const validTopic = isValidTopic(topic) ? topic : 'school';
      console.log('Using topic:', validTopic);
      
      // Generate vocabulary using OpenAI with appropriate difficulty
      const generatedItems = await generateVocabulary(
        validTopic,
        language,
        wordCount,
        difficulty || 'easy'
      );

      console.log('Generated vocabulary items:', generatedItems);

      // Transform the items to include IDs
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

  // Simple check for valid topic
  const isValidTopic = (topic: string): boolean => {
    // Consider a topic valid if it contains at least 3 characters and is mostly letters
    return topic.length >= 3 && /^[A-Za-z\s]+$/.test(topic);
  };

  // Function to start the countdown
  const startCountdown = () => {
    dispatch({ type: 'START_COUNTDOWN' });
  };

  // Function to start the game
  const startGame = () => {
    dispatch({ type: 'START_GAME' });
  };

  // Function to end the game
  const endGame = () => {
    dispatch({ type: 'END_GAME' });
  };

  // Function to update the time remaining
  const updateTimeRemaining = (time: number) => {
    dispatch({ type: 'UPDATE_TIME_REMAINING', payload: time });
  };

  // Function to increment matches count
  const incrementMatches = () => {
    dispatch({ type: 'INCREMENT_MATCHES' });
  };

  // Function to increment misses count
  const incrementMisses = () => {
    dispatch({ type: 'INCREMENT_MISSES' });
  };

  // Function to reset the game
  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };
  
  // Function to completely clear the game state
  const clearGameState = () => {
    dispatch({ type: 'CLEAR_GAME_STATE' });
  };

  // Combine all values and functions for the context
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