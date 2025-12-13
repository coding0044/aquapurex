import React, { useState, useEffect } from 'react';
import './ProcessSection.css'
import { useInView } from 'react-intersection-observer';

const ProcessSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [activeStep, setActiveStep] = useState(null);
  const [waterLevel, setWaterLevel] = useState(0);

  const steps = [
    {
      step: "Step 1",
      title: "Sediment Filtration",
      text: "Removes dust, sand, rust, and visible particles to prepare the water for deeper purification.",
      icon: "🔍"
    },
    {
      step: "Step 2",
      title: "Activated Carbon Filtration",
      text: "Reduces chlorine, organic contaminants, and unpleasant odors to improve base taste and safety.",
      icon: "🌫️"
    },
    {
      step: "Step 3",
      title: "Reverse Osmosis (RO)",
      text: "Forces water through a fine membrane to remove dissolved salts, heavy metals, and micro-impurities.",
      icon: "⚡"
    },
    {
      step: "Step 4",
      title: "UV Sterilization",
      text: "Uses ultraviolet light to neutralize bacteria and viruses without adding any chemicals.",
      icon: "💡"
  
    },
    {
      step: "Step 5",
      title: "Mineral Enhancement",
      text: "Reintroduces essential minerals from premium German sources to create balanced, great-tasting water.",
      icon: "💎"
    }
  ];

  // Animate water fill when section is in view
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setWaterLevel(100), 300);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <section id="process" className="process-section">
      <div className="section-inner">
        <div className={`section-header ${inView ? 'section-visible' : ''}`} ref={ref}>
          <div className="section-kicker">
            <span className="kicker-icon">💧</span>
            Purification Process
          </div>
          <h2 className="section-title">5-Step Advanced Purification.</h2>
          <p className="section-subtitle">
            From source to sip, every stage of AquaPureX is monitored, filtered, and tested to meet strict quality standards.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="process-progress">
          {steps.map((_, index) => (
            <div 
              key={index}
              className={`progress-step ${activeStep === index ? 'active' : ''}`}
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className="progress-dot"></div>
              {index < steps.length - 1 && <div className="progress-line"></div>}
            </div>
          ))}
        </div>

        {/* Enhanced Process Cards */}
        <div className="process-grid">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`card process-card ${activeStep === index ? 'card-active' : ''} ${inView ? 'card-animate' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className="card-icon">{step.icon}</div>
              <div className="step-num">{step.step}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-text">{step.text}</p>
              
              {/* Card Footer with Stats */}
              
              
              {/* Hover Effect Indicator */}
              <div className="card-hover-indicator"></div>
            </div>
          ))}
        </div>

        {/* Animated Water Fill */}
        <div className="process-timeline">
          <div className="water-fill-track">
            <div 
              className="water-fill"
              style={{
                width: `${waterLevel}%`,
                transition: 'width 2.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div className="water-wave"></div>
            </div>
          </div>
          <div className="timeline-marker">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`marker ${inView ? 'marker-animate' : ''}`}
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <span className="marker-text">{step.step.replace('Step ', '')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        
      </div>
    </section>
  );
};

export default ProcessSection;