import React, { useState, useEffect } from 'react';
import './ProcessSection.css';
import { useInView } from 'react-intersection-observer';

const ProcessSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      step: 'Step 1',
      title: 'Sediment Filtration',
      text: 'Removes dust, sand, rust, and visible particles to prepare water for deeper purification.',
      icon: '🔍',
    },
    {
      step: 'Step 2',
      title: 'Activated Carbon',
      text: 'Reduces chlorine, organic contaminants, and odors for improved taste and safety.',
      icon: '🌫️',
    },
    {
      step: 'Step 3',
      title: 'Reverse Osmosis',
      text: 'Eliminates dissolved salts, heavy metals, and micro-impurities through RO membrane.',
      icon: '⚡',
    },
    {
      step: 'Step 4',
      title: 'UV Sterilization',
      text: 'Neutralizes bacteria and viruses using ultraviolet light without chemicals.',
      icon: '💡',
    },
    {
      step: 'Step 5',
      title: 'Mineral Boost',
      text: 'Adds essential minerals from premium German sources for balanced taste.',
      icon: '💎',
    },
  ];

  return (
    <section id="process" className="process-section">
      <div className="section-inner">
        {/* Header */}
        <div ref={ref} className={`section-header ${inView ? 'section-visible' : ''}`}>
          <div className="section-kicker">
            <span className="kicker-icon">💧</span>
            Purification Process
          </div>
          <h2 className="section-title">5-Step Advanced Purification</h2>
          <p className="section-subtitle">
            Every stage of AquaPureX ensures purity, safety, and great taste.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="process-progress">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`progress-step ${activeStep === index || activeStep === null ? 'active' : ''}`}
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className="progress-dot">
                <span className="progress-step-number">{index + 1}</span>
              </div>
              {index < steps.length - 1 && <div className="progress-line"></div>}
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="process-grid">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`process-card ${inView ? 'card-animate' : ''} ${activeStep === index ? 'card-active' : ''
                }`}
              style={{ animationDelay: `${index * 120}ms` }}
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
              onClick={() => setActiveStep(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveStep(index);
                }
              }}
            >
              <div className="card-head">
                <span className="card-icon">{step.icon}</span>
                <span className="step-num">{step.step}</span>
              </div>

              <h3 className="step-title">{step.title}</h3>
              <p className="step-text" style={{
                    textAlign: 'center',
              }}>{step.text}</p>

              <div className="card-hover-indicator"></div>
            </div>
          ))}
        </div>
      </div>
 

    </section>
  );
};

export default ProcessSection;