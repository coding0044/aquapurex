import React from 'react';
import './Hero.css';

const Hero = ({ scrollToId }) => {
  
  const openWhatsApp = () => {
    const phone = '923021724801';
    const msg = encodeURIComponent('Salam AquaPureX, I would like to place a water order.');
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  return (
    <section id="hero" className="hero">
      {/* LEFT CONTENT */}
      <div className="hero-left">
        <div className="eyebrow">Premium Mineral Water</div>

        <h1 className="hero-title">
          Pure Water. <span className="hero-highlight">Advanced Technology.</span>
          <br />Trusted by Families.
        </h1>

        <p className="hero-text">
          AquaPureX delivers clean, great-tasting water for your home and office using RO + UV purification and balanced minerals.
        </p>

        <div className="heroCta">
          {/* Direct WhatsApp Order */}
          <button className="ctaPrimary" onClick={openWhatsApp}>
            Order Now on WhatsApp
          </button>
          
          <button className="ctaOutline" onClick={() => scrollToId('process')} style={{
                width: '218px',
          }}>
            See How We Purify
          </button>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="hero-right">
        <div className="bottles-container">
          <div className="bottle-right">
            <img
              src="/images/360/bottle-360/frame_000.jpg"
              alt="AquaPureX Bottle"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;