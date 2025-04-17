// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className='text-center mx-4'>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-700 dark:to-secondary-700">
        <div className="container sm:px-6 lg:px-8 py-8 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-center mb-4">
                Welcome to PolyLingo!
              </h1>
              <p className="text-center text-2xl px-4">
                I wanted to make a site where people can learn languages in a fun, engaging way! Practice your vocabulary, improve your comprehension, and have fun with interactive games that can match your level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 bg-white dark:bg-neutral-800">
        <div className="container sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Game Modes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Matching Game Feature */}
            <div className="bg-neutral-50 rounded-xl shadow-md transition-transform hover:scale-105 box">
              <div className="h-3 bg-primary-500"></div>
              <div className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" width='200'>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Matching Game</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Match words to their translations as quickly as possible. Great for building vocabulary recognition.
                </p>
              </div>
            </div>
            
            {/* Flashcard Game Feature */}
            <div className="bg-neutral-50 dark:bg-neutral-700 rounded-xl shadow-md transition-transform hover:scale-105 box">
              <div className="h-3 bg-secondary-500"></div>
              <div className="p-6">
                <div className="w-12 h-12 rounded-lg bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-600 dark:text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" width='200'>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Flashcard Challenge</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Test your recall with rapid-fire flashcards. Beat your previous time and improve retention.
                </p>
              </div>
            </div>
            
            {/* Sentence Game Feature */}
            <div className="bg-neutral-50 dark:bg-neutral-700 rounded-xl shadow-md transition-transform hover:scale-105 box">
              <div className="h-3 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
              <div className="p-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" width='200'>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Sentence Builder</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Translate words in context within sentences. Level up your comprehension and grammar skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-neutral-100 dark:bg-neutral-800">
        <div className="container sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
            Choose from multiple languages and game modes to customize your learning experience.
          </p>
          // src/pages/HomePage.tsx (continued)
            <Link to="/games" className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-md transition-all">
              Get Started Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor" width='30'>
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
      </section>
    </div>
  );
};

export default HomePage;