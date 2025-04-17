// src/pages/MatchingGameWrapper.tsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MatchingGamePage from '../../../MatchingGamePage';

const MatchingGameWrapper: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Parse parameters here to validate before rendering
  const params = new URLSearchParams(location.search);
  const language = params.get('language');
  const difficulty = params.get('difficulty');
  const wordCount = params.get('wordCount');
  const topic = params.get('topic');
  
  // Validate parameters
  useEffect(() => {
    if (!language || !difficulty || !topic || !wordCount) {
      console.error('Missing URL parameters, redirecting to games page');
      navigate('/games');
    }
  }, [language, difficulty, topic, wordCount, navigate]);
  
  // If missing parameters, show loading or null
  if (!language || !difficulty || !topic || !wordCount) {
    return <div className="game-container">Validating game parameters...</div>;
  }
  
  // This forces a complete remount with valid parameters
  return <MatchingGamePage key={location.search} />;
};

export default MatchingGameWrapper;