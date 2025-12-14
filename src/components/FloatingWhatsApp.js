import React, { useState, useEffect } from 'react';
import './FloatingWhatsApp.css'; // CSS file (see below)

const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [pulse, setPulse] = useState(true);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulse(prev => !prev);
    }, 3000);

    const scrollHandler = () => {
      if (window.scrollY > 300) setIsVisible(true);
    };

    window.addEventListener('scroll', scrollHandler);
    return () => {
      clearInterval(pulseInterval);
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const openWhatsApp = () => {
    const phone = '923711724801';
    const msg = encodeURIComponent('Salam AquaPureX, I would like to place a water order.');
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  if (!isVisible) return null;

  return (
    <button
      className={`floating-contact ${pulse ? 'pulse' : ''}`}
      onClick={openWhatsApp}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      aria-label="Order AquaPureX on WhatsApp"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp Icon"
        className="whatsapp-icon"
      />
      {hovering && <span className="hover-msg">Order on WhatsApp</span>}
    </button>
  );
};

export default FloatingWhatsApp;
