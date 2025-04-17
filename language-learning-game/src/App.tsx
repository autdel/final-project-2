import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './utils/ThemeContext';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/errors/ErrorBoundary';
import ErrorPage from './components/errors/ErrorPage';
import ApiTest from './components/ApiTest';
import HomePage from './HomePage';
import GamesPage from './GamesPage';
import AboutPage from './AboutPage';
import MatchingGameWrapper from './components/state/game/MatchingGameWrapper';
import { GameProvider } from './components/state/game';

// I ran out of time to implement these other pages. These will get converted once they are done.

const FlashcardGamePage = () => <div><h1>Welcome to the Flashcard Page!!</h1></div>;
const SentenceGamePage = () => <div><h1>This will be the Sentence Page!!</h1></div>;
const NotFoundPage = () => <ErrorPage title="Page Not Found!" message="Check to make sure your url is correct." />;

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <GameProvider>
          <Router>
            <Layout>
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/test" element={<ApiTest/>} />
                  <Route path="/games" element={<GamesPage />} />
                  <Route path="/games/matching" element={<MatchingGameWrapper />} />
                  <Route path="/games/flashcard" element={<FlashcardGamePage />} />
                  <Route path="/games/sentence" element={<SentenceGamePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/*" element={<NotFoundPage />} />
                </Routes>
              </ErrorBoundary>
            </Layout>
          </Router>
        </GameProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;