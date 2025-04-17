import React from 'react';
import profileImage from './assets/profile.png';

const AboutPage: React.FC = () => {
  return (
    <div className="text-center">
      <section className="container py-4">
        <div className="small-container mx-auto">
          <h1 className="text-4xl font-bold mb-6">About The Creator</h1>
          {/* Profile image */}
          <div className="flex justify-center mb-6">
            <img
              src={profileImage}
              alt="Profile"
              className="rounded-full object-cover shadow-md"
              style={{ width: 150, height: 150, borderRadius: 75 }}
            />
          </div>
          <h6>
            I created this site because I wanted to build a space where people could learn languages in a fun, engaging, and meaningful way. Language learning shouldn't feel like a chore — it should be something you look forward to. That’s why I focused on designing tools that make it easy to practice vocabulary, improve comprehension, and stay motivated through interactive games that adapt to your skill level.
          </h6>
          <h6>
            What really inspired me to build this was my own love for learning languages. I'm a huge fan of Duolingo — I’ve spent countless hours using it and always admired how it makes learning feel like a game. I wanted to capture that same energy, while also offering a more customizable experience that lets you learn at your own pace and in your own style.
          </h6>
          <h6>
            Ultimately, I’ve always dreamed of becoming a polyglot — someone who speaks multiple languages fluently. This project is both a personal passion and a way to help others on their own language-learning journey. Whether you're just starting out or brushing up on a new language, I hope this site makes the process enjoyable and rewarding.
          </h6>
          <h6>
            During development, I ran into some issues with third-party APIs that limited how much I could test and build out all the game modes I had planned. As a result, only one game is fully functional right now — but don’t worry! The Flashcard and Sentence Builder games are in progress and will be released soon. I’m excited to keep improving the site and adding more features for learners of all levels.
          </h6>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
