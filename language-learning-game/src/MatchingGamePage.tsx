import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  useGameState, 
  useGameDispatch,
  useLoadVocabulary,
  useStartGame,
  useEndGame,
  useUpdateTimeRemaining,
  useIncrementMatches,
  useIncrementMisses,
  useResetGame,
  useClearGameState
} from './components/state/game';
import LoadingSpinner from './components/Loading';
import GameTimer from './components/games/GameTimer';
import CountdownScreen from './components/games/CountdownScreen';
import ResultsModal from './components/games/ResultsModal';
import './components/games/matchingGame.css';

interface CardProps {
  text: string;
  isSelected: boolean;
  isMatched: boolean;
  isIncorrectMatch: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = React.memo(({ 
  text, 
  isSelected, 
  isMatched,
  isIncorrectMatch, 
  onClick 
}) => {
  const cardClass = `
    game-card 
    ${isSelected ? 'selected' : ''} 
    ${isMatched ? 'matched' : ''} 
    ${isIncorrectMatch ? 'incorrect-match' : ''}
  `;
  
  return (
    <div className={cardClass} onClick={onClick}>
      <span>{text}</span>
    </div>
  );
});

Card.displayName = 'Card';

const MatchingGamePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Use the game hooks
  const state = useGameState();
  const dispatch = useGameDispatch();
  const loadVocabulary = useLoadVocabulary();
  const startGame = useStartGame();
  const endGame = useEndGame();
  const updateTimeRemaining = useUpdateTimeRemaining();
  const incrementMatches = useIncrementMatches();
  const incrementMisses = useIncrementMisses();
  const resetGame = useResetGame();
  const clearGameState = useClearGameState();
  
  // Local state for the game
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedTranslation, setSelectedTranslation] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [incorrectPair, setIncorrectPair] = useState<[string | null, string | null]>([null, null]);
  const [showResults, setShowResults] = useState(false);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [shuffledTranslations, setShuffledTranslations] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);
  
  // Parse URL parameters
  const params = new URLSearchParams(location.search);
  const language = params.get('language');
  const difficulty = params.get('difficulty');
  const wordCount = parseInt(params.get('wordCount') || '5', 10);
  const topic = params.get('topic');
  
  // Initialize game once on mount
  useEffect(() => {
    // Skip if already initialized
    if (initialized) return;
    
    // Clear any previous state
    clearGameState();
    
    console.log('Initializing game with params:', { language, difficulty, wordCount, topic });
    
    // Initialize the game state
    dispatch({
      type: 'INITIALIZE_GAME',
      payload: {
        gameType: 'matching',
        language: language || '',
        difficulty: difficulty || '',
        wordCount,
        topic: topic || ''
      }
    });
    
    // Load vocabulary with direct parameters to avoid state timing issues
    loadVocabulary({
      topic: topic || undefined,
      language: language || undefined,
      wordCount,
      difficulty: difficulty || undefined
    });
    
    setInitialized(true);
  }, [language, difficulty, wordCount, topic, dispatch, loadVocabulary, clearGameState, initialized]);
  
  // Shuffle words and translations when vocabulary is loaded
  useEffect(() => {
    if (state.status === 'countdown' && state.vocabularyItems.length > 0) {
      console.log('Shuffling vocabulary items');
      // Shuffle words
      const words = state.vocabularyItems.map(item => item.word);
      setShuffledWords([...words].sort(() => Math.random() - 0.5));
      
      // Shuffle translations
      const translations = state.vocabularyItems.map(item => item.translation);
      setShuffledTranslations([...translations].sort(() => Math.random() - 0.5));
    }
  }, [state.status, state.vocabularyItems]);
  
  // Timer effect
  useEffect(() => {
    let timerId: number | undefined;
    
    if (state.status === 'playing') {
      timerId = window.setInterval(() => {
        const elapsed = Math.floor((Date.now() - (state.startTime || 0)) / 1000);
        const remaining = Math.max(0, state.timeLimit - elapsed);
        updateTimeRemaining(remaining);
        
        if (remaining <= 0 || matchedPairs.length === state.vocabularyItems.length * 2) {
          if (timerId) {
            clearInterval(timerId);
          }
          endGame();
          setShowResults(true);
        }
      }, 1000);
    }
    
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [state.status, state.startTime, state.timeLimit, matchedPairs.length, state.vocabularyItems.length, updateTimeRemaining, endGame]);
  
  // Memoize handlers to prevent unnecessary re-renders
  const handleWordClick = useCallback((word: string) => {
    if (state.status !== 'playing' || matchedPairs.includes(word) || incorrectPair[0] === word) {
      return;
    }
    
    setSelectedWord(word);
    
    if (selectedTranslation) {
      // Find matching item
      const matchingItem = state.vocabularyItems.find(
        item => item.word === word && item.translation === selectedTranslation
      );
      
      if (matchingItem) {
        // Correct match
        incrementMatches();
        setMatchedPairs(prev => [...prev, word, selectedTranslation]);
        setSelectedWord(null);
        setSelectedTranslation(null);
        
        // Check if all pairs are matched
        if (matchedPairs.length + 2 >= state.vocabularyItems.length * 2) {
          endGame();
          setShowResults(true);
        }
      } else {
        // Incorrect match
        incrementMisses();
        setIncorrectPair([word, selectedTranslation]);
        
        // Clear selection after a delay
        setTimeout(() => {
          setIncorrectPair([null, null]);
          setSelectedWord(null);
          setSelectedTranslation(null);
        }, 800);
      }
    }
  }, [state.status, matchedPairs, incorrectPair, selectedTranslation, state.vocabularyItems, incrementMatches, incrementMisses, endGame]);
  
  // Handle translation selection
  const handleTranslationClick = useCallback((translation: string) => {
    if (state.status !== 'playing' || matchedPairs.includes(translation) || incorrectPair[1] === translation) {
      return;
    }
    
    setSelectedTranslation(translation);
    
    if (selectedWord) {
      // Find matching item
      const matchingItem = state.vocabularyItems.find(
        item => item.word === selectedWord && item.translation === translation
      );
      
      if (matchingItem) {
        // Correct match
        incrementMatches();
        setMatchedPairs(prev => [...prev, selectedWord, translation]);
        setSelectedWord(null);
        setSelectedTranslation(null);
        
        // Check if all pairs are matched
        if (matchedPairs.length + 2 >= state.vocabularyItems.length * 2) {
          endGame();
          setShowResults(true);
        }
      } else {
        // Incorrect match
        incrementMisses();
        setIncorrectPair([selectedWord, translation]);
        
        // Clear selection after a delay
        setTimeout(() => {
          setIncorrectPair([null, null]);
          setSelectedWord(null);
          setSelectedTranslation(null);
        }, 800);
      }
    }
  }, [state.status, matchedPairs, incorrectPair, selectedWord, state.vocabularyItems, incrementMatches, incrementMisses, endGame]);
  
  // Handle game restart
  const handleRestart = useCallback(() => {
    setSelectedWord(null);
    setSelectedTranslation(null);
    setMatchedPairs([]);
    setIncorrectPair([null, null]);
    setShowResults(false);
    resetGame();
    // Shuffle words and translations again
    const words = state.vocabularyItems.map(item => item.word);
    setShuffledWords([...words].sort(() => Math.random() - 0.5));
    const translations = state.vocabularyItems.map(item => item.translation);
    setShuffledTranslations([...translations].sort(() => Math.random() - 0.5));
  }, [state.vocabularyItems, resetGame]);
  
  // Handle exit to games page
  const handleExit = useCallback(() => {
    navigate('/games');
  }, [navigate]);
  
  // Render loading state
  if (state.status === 'loading') {
    return (
      <div className="game-container">
        <LoadingSpinner />
        <p className="loading-text">Loading vocabulary...</p>
      </div>
    );
  }
  
  // Render error state
  if (state.status === 'error') {
    return (
      <div className="game-container error-container">
        <h2>Error</h2>
        <p>{state.error}</p>
        <button className="btn-primary" onClick={handleExit}>
          Back to Games
        </button>
      </div>
    );
  }
  
  // Render countdown screen
  if (state.status === 'countdown') {
    return <CountdownScreen onComplete={startGame} />;
  }
  
  return (
    <div className="game-container">
      <div className="game-header">
        <h1 className="game-title">Vocabulary Matching</h1>
        <div className="game-subtitle">
          Match the words with their translations
        </div>
        <GameTimer time={state.timeRemaining} />
      </div>
      
      <div className="game-content">
        <div className="word-column">
          <h2 className="column-title">English</h2>
          <div className="cards-container">
            {shuffledWords.map((word) => (
              <Card
                key={`word-${word}`}
                text={word}
                isSelected={selectedWord === word}
                isMatched={matchedPairs.includes(word)}
                isIncorrectMatch={incorrectPair[0] === word}
                onClick={() => handleWordClick(word)}
              />
            ))}
          </div>
        </div>
        
        <div className="translation-column">
          <h2 className="column-title">Translation</h2>
          <div className="cards-container">
            {shuffledTranslations.map((translation) => (
              <Card
                key={`translation-${translation}`}
                text={translation}
                isSelected={selectedTranslation === translation}
                isMatched={matchedPairs.includes(translation)}
                isIncorrectMatch={incorrectPair[1] === translation}
                onClick={() => handleTranslationClick(translation)}
              />
            ))}
          </div>
        </div>
      </div>
      
      {showResults && (
        <ResultsModal
          isOpen={showResults}
          onRestart={handleRestart}
          onExit={handleExit}
          score={state.score}
          matches={state.matches}
          misses={state.misses}
          timeRemaining={state.timeRemaining}
          totalTime={state.timeLimit}
          isWin={matchedPairs.length === state.vocabularyItems.length * 2}
        />
      )}
    </div>
  );
};

export default MatchingGamePage;