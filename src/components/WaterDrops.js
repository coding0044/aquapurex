import React, { useEffect, useState } from 'react';

const WaterDrops = () => {
  const [drops, setDrops] = useState([]);
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const generateDrops = () => {
      const newDrops = [];
      const newBubbles = [];

      // Generate water drops
      for (let i = 0; i < 15; i++) {
        const size = Math.random() * 15 + 3;
        const left = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.3 + 0.1;

        newDrops.push({
          id: `drop-${Date.now()}-${i}`,
          size,
          left,
          duration,
          delay,
          opacity
        });
      }

      // Generate bubbles
      for (let i = 0; i < 8; i++) {
        const size = Math.random() * 25 + 5;
        const left = Math.random() * 100;
        const duration = Math.random() * 4 + 3;
        const delay = Math.random() * 4;
        const opacity = Math.random() * 0.2 + 0.1;

        newBubbles.push({
          id: `bubble-${Date.now()}-${i}`,
          size,
          left,
          duration,
          delay,
          opacity
        });
      }

      setDrops(newDrops);
      setBubbles(newBubbles);
    };

    generateDrops();
    const interval = setInterval(generateDrops, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="water-drops">
      {drops.map(drop => (
        <div
          key={drop.id}
          className="water-drop"
          style={{
            width: `${drop.size}px`,
            height: `${drop.size}px`,
            left: `${drop.left}%`,
            animation: `dropFall ${drop.duration}s linear ${drop.delay}s infinite`,
            opacity: drop.opacity
          }}
        />
      ))}
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="water-bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            animation: `bubbleRise ${bubble.duration}s linear ${bubble.delay}s infinite`,
            opacity: bubble.opacity
          }}
        />
      ))}
    </div>
  );
};

export default WaterDrops;