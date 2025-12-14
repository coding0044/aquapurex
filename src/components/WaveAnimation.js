import React, { useEffect, useState } from 'react';
import './WaveAnimation.css'; // You'll need this CSS file

const WaveAnimation = () => {
  const [waves, setWaves] = useState([]);

  useEffect(() => {
    const generateWaves = () => {
      const newWaves = [];
      for (let i = 0; i < 3; i++) {
        newWaves.push({
          id: i,
          speed: 20 + i * 5,
          delay: i * 2,
          opacity: 0.3 - (i * 0.1),
          scale: 1 + (i * 0.2) // Added scale for better wave effect
        });
      }
      setWaves(newWaves);
    };

    generateWaves();
  }, []);

  return (
    <div className="wave-container">
     
      {waves.map(wave => (
        <div
          key={wave.id}
          className="wave"
          style={{
            animation: `wave ${wave.speed}s linear ${wave.delay}s infinite`,
            opacity: wave.opacity,
            transform: `scale(${wave.scale})` // Apply scaling
          }}
        />
      ))}
    </div>
  );
};

export default WaveAnimation;