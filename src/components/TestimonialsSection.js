import React, { useState, useRef, useEffect } from 'react';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

import { useInView } from 'react-intersection-observer';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonialsRef = useRef(null);
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const testimonials = [
    {
      id: 1,
      quote: "AquaPureX gives us clean, safe, and great-tasting water for our kids every day..",
      author: "Ahmed",
      location: "Johar Town",
      since: "2023",
      rating: 5,
      avatarColor: "#4F46E5"
    },
    {
      id: 2,
      quote: "Delivery is always on time, and the team is very polite. It's one less thing to worry about in our daily routine.",
      author: "Fatima",
      location: "Wapda Town",
      since: "2024",
      rating: 5,
      avatarColor: "#10B981"
    },
    {
      id: 3,
      quote: "Best water service in Lahore! Consistent quality and excellent customer service. Highly recommended!",
      author: "Ali",
      location: "DHA Phase 5",
      since: "2023",
      rating: 5,
      avatarColor: "#F59E0B"
    },
    {
      id: 4,
      quote: "The subscription model saved us both time and money. Pure water delivered right to our doorstep.",
      author: "Sara",
      location: "Gulberg",
      since: "2024",
      rating: 5,
      avatarColor: "#EF4444"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (!inView) return;

    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [inView, testimonials.length]);

  const openWhatsApp = () => {
    const phone = '+923711724801';
    const msg = encodeURIComponent('Salam AquaPureX, I would like to place a water order.');
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  const callNow = () => {
    window.location.href = 'tel:+923711724801';
  };

  const renderStars = (count) => {
    return Array.from({ length: count }, (_, i) => (
      <span key={i} className="star-icon">★</span>
    ));
  };

  const renderAvatar = (author, color) => {
    const initials = author.charAt(0).toUpperCase();
    return (
      <div
        className="testimonial-avatar"
        style={{
          backgroundColor: color
        }}
      >
        {initials}
      </div>
    );
  };

  const goToPrev = () => {
    setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setActiveTestimonial(prev => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="testimonials-section" ref={ref}>
      {/* Background decorative elements */}
      <div className="bg-bubble bubble-1"></div>
      <div className="bg-bubble bubble-2"></div>
      <div className="bg-bubble bubble-3"></div>

      <div className={`testimonials-inner split ${inView ? 'visible' : ''}`}>
        <div className="testimonials-content">
          <div className="section-kicker">Customer Stories</div>
          <h2 className="section-title">
            Trusted by
            <span className="highlight-text" style={{
              marginLeft: '9px'
            }}>  Households</span>
            Across Lahore
          </h2>

          {/* Stats Row */}


          {/* Testimonials Carousel */}
          <div className="testimonials-carousel" ref={testimonialsRef}>
            <div
              className={`testimonial-card ${isVisible ? 'active' : ''}`}
              key={activeTestimonial}
            >
              {renderAvatar(testimonials[activeTestimonial].author, testimonials[activeTestimonial].avatarColor)}
              <div className="quote-icon">"</div>
              <p className="testimonial-quote">{testimonials[activeTestimonial].quote}</p>
              <div className="rating-stars">
                {renderStars(testimonials[activeTestimonial].rating)}
              </div>
              <div className="testimonial-author">
                <span className="author-name">{testimonials[activeTestimonial].author}</span>
                <span className="author-location"> · {testimonials[activeTestimonial].location}</span>
              </div>
              <div className="testimonial-meta">Customer since {testimonials[activeTestimonial].since}</div>
            </div>

            {/* Carousel Dots */}
            <div className="carousel-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next/Prev buttons */}
            <div className="carousel-nav">
              <button
                className="carousel-btn prev"
                onClick={goToPrev}
              >
                ←
              </button>
              <button
                className="carousel-btn next"
                onClick={goToNext}
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Panel */}
        <div className="cta-panel-wrapper">
          <div
            className={`cta-panel ${isHoveringCTA ? 'hover' : ''}`}
            onMouseEnter={() => setIsHoveringCTA(true)}
            onMouseLeave={() => setIsHoveringCTA(false)}
          >
            {/* Floating elements */}
            <div className="floating-water-drop"></div>
            <div className="floating-water-drop drop-2"></div>
            <div className="floating-water-drop drop-3"></div>


            <div className="cta-title">
              Ready for <span className="cta-highlight">Pure, Safe</span> Drinking Water?
            </div>

            <div className="cta-text">
              <div className="cta-feature">
                <span className="feature-icon">🚚</span>
                <span>Free Home Delivery</span>
              </div>
              <div className="cta-feature">
                <span className="feature-icon">💧</span>
                <span>100% Mineral Rich</span>
              </div>
              <div className="cta-feature">
                <span className="feature-icon">⏰</span>
                <span>Same Day Delivery</span>
              </div>
            </div>

            {/* Animated Button Container */}
            <div className="cta-buttons">
              <button
                className="btn btn-whatsapp"
                onClick={openWhatsApp}
                style={{
                  background: '#7dd3fc59',
                }}  >
                <span className="btn-icon">
                  <div className="whatsapp-pulse"></div>
                  <FaWhatsapp size={24} /> {/* Icon replaces 💬 */}
                </span>

                <span className="btn-text">
                  <span className="btn-main">Order on WhatsApp</span>
                  <span className="btn-sub">Instant Response</span>
                </span>
              </button>

              <button
                className="btn btn-call"
                onClick={callNow}
                style={{
                  background: '#7dd3fc59',
                }}   >
                <span className="btn-icon">
                  <div className="call-ring"></div>
                  <FaPhoneAlt size={24} /> {/* Icon replaces 📞 */}
                </span>

                <span className="btn-text">
                  <span className="btn-main">Call Now</span>
                  <span className="btn-sub">Direct Support</span>
                </span>
              </button>
            </div>

            {/* Timer/Offer Section */}


            <div className="cta-contact">
              <div className="contact-phone">
                <span className="phone-icon"><FaPhoneAlt size={24} /></span>
                <span className="phone-number">0371-1724801</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;