import React, { useState, useEffect, useRef } from 'react';
import './WhySection.css';
import { useInView } from 'react-intersection-observer';

const WhySection = () => {
  const [ref, inView] = useInView({
    threshold: 0.05,
    triggerOnce: false,
  });

  const [hoveredCard, setHoveredCard] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [meterAnimation, setMeterAnimation] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const meterTimeoutRef = useRef(null);

  // Scroll progress effect
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('why');
      if (section) {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Meter animation effect
  useEffect(() => {
    if (inView) {
      console.log("Section in view - starting animation");
      
      // Reset animation state
      setMeterAnimation(false);
      setAnimationKey(prev => prev + 1);
      
      // Clear any existing timeout
      if (meterTimeoutRef.current) {
        clearTimeout(meterTimeoutRef.current);
      }
      
      // Start animation after a short delay
      meterTimeoutRef.current = setTimeout(() => {
        console.log("Starting meter animation");
        setMeterAnimation(true);
      }, 500);
      
    } else {
      // Section out of view - reset for next time
      console.log("Section out of view - resetting");
      setMeterAnimation(false);
      
      if (meterTimeoutRef.current) {
        clearTimeout(meterTimeoutRef.current);
      }
    }
    
    return () => {
      if (meterTimeoutRef.current) {
        clearTimeout(meterTimeoutRef.current);
      }
    };
  }, [inView]);

  // Manually trigger animation on click
  const replayMeterAnimation = () => {
    setMeterAnimation(false);
    setTimeout(() => {
      setMeterAnimation(true);
      setAnimationKey(prev => prev + 1);
    }, 100);
  };

  const cards = [
    {
      id: 1,
      icon: '⚙',
      title: 'Advanced RO + UV Technology',
      text: 'RO + UV removes impurities for safe, clean water.',
      gradient: 'linear-gradient(135deg, #005faf, #0066cc)',
      stats: '99.9% Pure'
    },
    {
      id: 2,
      icon: '💧',
      title: 'Balanced German Minerals',
    text: 'Adds essential minerals for smooth, clean taste',
      gradient: 'linear-gradient(135deg, #005faf, #0066cc)',
      stats: '7 Essential Minerals'
    },
    {
      id: 3,
      icon: '👨‍👩‍👧',
      title: 'Safe for All Ages',
      text: 'Enhanced with premium minerals for smooth, clean, and refreshing water.',
      gradient: 'linear-gradient(135deg, #005faf, #0066cc)',
      stats: 'Family Approved'
    },
    {
      id: 4,
      icon: '🚚',
      title: 'Free Delivery in Lahore — Coming Soon to Multan and Faisalabad',
      text: 'Fast, reliable, free delivery across Lahore to home, office, or shop.',
      gradient: 'linear-gradient(135deg, #005faf, #0066cc)',
      stats: 'Same Day Delivery'
    },
  ];

  return (
    <section 
      id="why-AquaPureX" 
      className={`why-section ${inView ? 'section-visible' : ''}`}
      style={{
        '--scroll-progress': scrollProgress,
      }}
    >
      {/* Animated Background Elements */}
      <div className="animated-bg-elements">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="water-drop"></div>
      </div>

      <div className="section-inner" ref={ref}>
        {/* Enhanced Section Header with Counter */}
        <div className="section-header">
          <div className="section-kicker">
            <span className="kicker-badge">Why AquaPureX</span>
            
          </div>
          <h2 className="section-title">
            <span className="title-highlight">Engineered</span> for Purity,
            <br />
            <span className="title-highlight">Crafted</span> for Taste.
          </h2>
          <p className="section-subtitle">
            AquaPureX combines <span className="highlight">advanced purification</span> technology with 
            <span className="highlight"> carefully balanced minerals</span> to give you water that is not only safe, 
            but refreshing in every sip.
          </p>
          
         
        </div>

        {/* Enhanced Main Grid */}
        <div className="why-grid">
          {/* Cards with Stats */}
          <div className="why-points">
            {cards.map((card) => (
              <div 
                key={card.id}
                className={`card card-${card.id} ${hoveredCard === card.id ? 'card-active' : ''}`}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="card-glow"></div>
                <div className="card-content-wrapper">
                  <div className="card-icon-container">
                    <div 
                      className="badge-icon"
                      style={{ background: card.gradient }}
                    >
                      {card.icon}
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="card-header">
                      <h3 className="card-title" style={{
                        fontSize:'14px'
                      }}>{card.title}</h3>
                    </div>
                    <p className="card-text" style={{

                    }}>{card.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Image / Highlight Section */}
          <div className="why-image">
            <div className="why-image-glow"></div>
            <div className="why-image-inner">
              <div>
                <div className="why-image-title">
                  <span className="title-sparkle">✨</span>
                  Because your family deserves better water.
                </div>
                <div className="why-tags">
                  {['RO + UV Purified', 'Lab Tested', 'Kids Friendly', 'Daily Hydration'].map((tag, i) => (
                    <div 
                      key={i} 
                      className="why-tag"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Interactive Water Quality Meter - AUTO-REPLAY */}
              <div className="quality-meter" key={animationKey}>
                <div className="meter-header">
                  <div className="meter-label">Water Quality Score</div>
                  <div className="meter-controls">
                    <span className="meter-percentage">99% Purity</span>
                    <button 
                      className="replay-button"
                      onClick={replayMeterAnimation}
                      title="Replay animation"
                    >
                      🔄
                    </button>
                  </div>
                </div>
                
                <div className="meter-bar">
                  <div 
                    className={`meter-fill ${meterAnimation ? 'completed' : ''}`}
                    style={{ 
                      width: meterAnimation ? '99%' : '0%',
                      transition: meterAnimation ? 'width 1.5s ease-out' : 'none'
                    }}
                  >
                    <div className="water-waves">
                      <div className="water-wave"></div>
                      <div className="water-wave"></div>
                    </div>
                    <div 
                      className="meter-score"
                      style={{ 
                        opacity: meterAnimation ? '1' : '0',
                        animation: meterAnimation ? 'bounceScore 0.5s ease 1.5s forwards' : 'none'
                      }}
                    >
                      99/100
                    </div>
                  </div>
                </div>
                
               
              </div>

              <div className="why-note">
                <div className="note-icon">💡</div>
                <div className="note-text">
                  <strong>Pro Tip:</strong> From morning tea to evening meals, 
                  AquaPureX keeps every glass on your table clean, safe, and refreshing.
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default WhySection;