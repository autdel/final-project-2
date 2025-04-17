import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className='text-center mx-4'>
      <section>
        <div className="container py-4 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-2 md:mb-0">
              <h1 className="text-center mb-4">
                Welcome to PolyLingo!
              </h1>
              <h5 className="text-center text-2xl px-12">
                I wanted to make a site where people can learn languages in a fun, engaging way! Practice your vocabulary, improve your comprehension, and have fun with interactive games that can match your level.
              </h5>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 px-4 bg-white dark:bg-neutral-800">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">Game Modes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Matching Game Feature */}
            <div className="bg-neutral-50 rounded-xl shadow-md transition-transform hover:scale-105 box">
              <div className="p-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" width='200'>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Matching Game</h3>
                <h6 className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Match words to their translations as quickly as possible. Great for building vocabulary recognition.
                </h6>
              </div>
            </div>
            
            {/* Flashcard Game Feature */}
            <div className="bg-neutral-50 dark:bg-neutral-700 rounded-xl shadow-md transition-transform hover:scale-105 box">
              <div className="p-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-600 dark:text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" width='200'>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Rapid Flashcards</h3>
                <h6 className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Test your recall with rapid-fire flashcards. Beat your previous time and improve retention.
                </h6>
              </div>
            </div>
            
            {/* Sentence Game Feature */}
            <div className="rounded-xl shadow-md transition-transform hover:scale-105 box">
              <div className="p-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" width='200'>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Sentence Builder</h3>
                <h6 className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Translate words in context within sentences. Level up your comprehension and grammar skills.
                </h6>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-neutral-100 dark:bg-neutral-800">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <h6 className="text-lg mb-8 max-w-2xl mx-auto">
            Choose from multiple languages and game modes to customize your learning experience.
          </h6>
          <button className="action-btn" onClick={() => window.location.href = './games'}>
            Start Playing!
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;