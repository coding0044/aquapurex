import React, { useState, useEffect } from 'react';

const TypingAnimation = ({ text, speed = 100, loop = true }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timeout;

    if (!isPaused) {
      timeout = setTimeout(() => {
        if (!isDeleting && currentIndex < text.length) {
          // Typing forward
          setDisplayedText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        } else if (isDeleting && currentIndex > 0) {
          // Deleting
          setDisplayedText(prev => prev.slice(0, -1));
          setCurrentIndex(prev => prev - 1);
        } else if (currentIndex === text.length) {
          // Finished typing, wait then start deleting
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, 2000);
        } else if (currentIndex === 0) {
          // Finished deleting, wait then start typing again
          if (loop) {
            setIsPaused(true);
            setTimeout(() => {
              setIsPaused(false);
              setIsDeleting(false);
            }, 1000);
          }
        }
      }, isDeleting ? speed / 2 : speed);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, isPaused, text, speed, loop]);

  return (
    <span className="typing-container">
      <span className="typing-text">
        {displayedText}
        <span className="cursor" style={{opacity: isPaused ? 0 : 1}}>|</span>
      </span>
    </span>
  );
};

export default TypingAnimation;