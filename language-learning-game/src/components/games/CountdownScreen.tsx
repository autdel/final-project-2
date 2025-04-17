// src/components/games/CountdownScreen.tsx
import React, { useEffect, useState } from 'react';
import './CountdownScreen.css';

interface CountdownScreenProps {
  onComplete: () => void;
}

const CountdownScreen: React.FC<CountdownScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState(3);
  
  useEffect(() => {
    if (count <= 0) {
      onComplete();
      return;
    }
    
    const timerId = setTimeout(() => {
      setCount(count - 1);
    }, 1000);
    
    return () => clearTimeout(timerId);
  }, [count, onComplete]);
  
  return (
    <div className="countdown-container">
      <div className="countdown-text">
        {count > 0 ? count : 'Go!'}
      </div>
    </div>
  );
};

export default CountdownScreen;