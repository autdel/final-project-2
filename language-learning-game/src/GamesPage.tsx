// src/pages/GamesPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './components/styles/gamesPage.css';

// Define types for form data
interface GameFormData {
  gameType: string;
  language: string;
  difficulty: string;
  wordCount: number;
  topic: string;
}

const GamesPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Initialize form data with default values
  const [formData, setFormData] = useState<GameFormData>({
    gameType: '',
    language: '',
    difficulty: '',
    wordCount: 5,
    topic: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // For topic field, only allow letters and spaces
    if (name === 'topic' && !/^[A-Za-z\s]*$/.test(value)) {
      return;
    }
    
    const updatedFormData = {
      ...formData,
      [name]: name === 'wordCount' ? parseInt(value, 10) : value
    };
    
    setFormData(updatedFormData);
    
    const { gameType, language, difficulty, topic } = updatedFormData;
    setIsFormValid(!!gameType && !!language && !!difficulty && !!topic);
  };

  // submit the valid form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    
    // Navigate to the selected game page with query parameters
    const params = new URLSearchParams({
      language: formData.language,
      difficulty: formData.difficulty,
      wordCount: formData.wordCount.toString(),
      topic: formData.topic
    });
    
    let route = '';
    switch (formData.gameType) {
      case 'matching':
        route = '/games/matching';
        break;
      case 'flashcard':
        route = '/games/flashcard';
        break;
      case 'sentence':
        route = '/games/sentence';
        break;
    }
    
    navigate(`${route}?${params.toString()}`);
  };

  return (
    <div className="games-container">
      <h1 className="games-title">Play a Game!</h1>
      
      {/* Descriptions of each game */}
      <div className="game-descriptions">
        <div className="game-description-card">
          <h3>Vocabulary Matching</h3>
          <p>
            Match words to their translations as quickly as possible. 
            Great for building vocabulary recognition and speed.
          </p>
        </div>
        
        <div className="game-description-card">
          <h3>Rapid Flashcards</h3>
          <p>
            Test your recall with rapid-fire flashcards. 
            Beat your previous time and improve retention.
          </p>
        </div>
        
        <div className="game-description-card">
          <h3>Sentence Builder</h3>
          <p>
            Translate words in context within sentences. 
            Level up your comprehension and grammar skills.
          </p>
        </div>
      </div>

      <div className="game-setup-card">
        <h2 className="setup-heading">Game Settings</h2>
        <p className="setup-instructions">
          Select your game settings below. Choose a game type, target language, 
          difficulty level, and how many words you want to practice.
          Once you're ready, click "Start Game" to begin!
        </p>
        
        <form className="game-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="gameType">Game Type</label>
            <select 
              id="gameType" 
              name="gameType" 
              value={formData.gameType}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select a game</option>
              <option value="matching">Vocabulary Matching</option>
              <option value="flashcard" disabled>Rapid Flashcards</option>
              <option value="sentence" disabled>Sentence Builder</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="language">Language</label>
            <select 
              id="language" 
              name="language" 
              value={formData.language}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select a language</option>
              <option value="ko">Korean</option>
              <option value="es">Spanish</option>
              <option value="ja">Japanese</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="difficulty">Difficulty</label>
            <select 
              id="difficulty" 
              name="difficulty" 
              value={formData.difficulty}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select difficulty</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="hard">Hard</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="wordCount">Word Count</label>
            <select 
              id="wordCount" 
              name="wordCount" 
              value={formData.wordCount}
              onChange={handleInputChange}
              required
            >
              <option value={5}>5 words</option>
              <option value={10}>10 words</option>
              <option value={15}>15 words</option>
              <option value={20}>20 words</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="topic">Vocabulary Topic</label>
            <input
              id="topic"
              name="topic"
              type="text"
              value={formData.topic}
              onChange={handleInputChange}
              placeholder="Enter a topic (e.g., food, travel)"
              maxLength={50}
              required
              className="form-input"
            />
            <small className="form-hint">Letters only, max 50 characters</small>
          </div>
          
          <button 
            type="submit" 
            className={`start-button ${!isFormValid ? 'disabled' : ''}`}
            disabled={!isFormValid}
          >
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default GamesPage;