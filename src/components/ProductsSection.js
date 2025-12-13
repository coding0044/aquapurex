import React, { useState, useRef, useEffect } from 'react';
import './ProductsSection.css';

import { useInView } from 'react-intersection-observer';

const ProductsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const summaryRef = useRef(null);
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const products = [
    {
      id: 1,
      title: "19L Home & Office Bottle",
      size: "For dispensers, families & workplaces",
      description: "Our signature large-format bottle, ideal for water dispensers in homes, offices, clinics, and shops.",
      tag: "Most Popular",
      image: "images/aquapurex-19L-thumb.png"
    },
    {
      id: 2,
      title: "1.5L Family Bottle",
      size: "Perfect for dining tables",
      description: "Great for family meals, mini gatherings, and everyday hydration at home.",
      tag: "Family Favourite",
      image: "images/aquapurex-1_5L-thumb.png"
    },
    {
      id: 3,
      title: "500 ml On-the-Go Bottle",
      size: "Work, gym & travel",
      description: "Stay hydrated wherever you are — keep AquaPureX in your bag, car, or at your desk.",
      tag: "Grab & Go",
      image: "images/aquapurex-500ml-thumb.png"
    },
    {
      id: 4,
      title: "250 ml Kids Bottle",
      size: "School & tiffin-friendly",
      description: "A child-friendly serving size that fits easily into lunch boxes and school bags.",
      tag: "Kids Safe",
      image: "images/aquapurex-250ml-thumb.png"
    }
  ];

  const productGradients = [
    "linear-gradient(135deg, #0066cc, #004080)",
    "linear-gradient(135deg, #00c6ff, #0072ff)",
    "linear-gradient(135deg, #00b09b, #96c93d)",
    "linear-gradient(135deg, #ff7e5f, #feb47b)"
  ];

  const productIcons = ["🏢", "👨‍👩‍👧‍👦", "🚶‍♂️", "🎒"];

  const handleProductClick = (index) => {
    if (isAnimating || selectedProduct === index) return;
    
    setIsAnimating(true);
    setSelectedProduct(index);
    
    // Smooth scroll to summary
    setTimeout(() => {
      summaryRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }, 150);
    
    // Reset animation state
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-rotate products on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      const interval = setInterval(() => {
        setSelectedProduct(prev => (prev + 1) % products.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [products.length]);

  return (
    <section id="products" className="products">
      <div className="section-inner">
        <div className={`section-header ${inView ? 'section-visible' : ''}`} ref={ref}>
          <div className="section-kicker">Product Range</div>
          <h2 className="section-title">Choose the Right Bottle for Your Needs.</h2>
          <p className="section-subtitle">
            Whether it's for home, office, travel, or school, AquaPureX has a bottle size tailored to your daily routine.
          </p>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`product-card ${selectedProduct === index ? 'selected' : ''} ${isAnimating ? 'animating' : ''}`}
              onClick={() => handleProductClick(index)}
              style={{ '--card-gradient': productGradients[index] }}
            >
              <div className="product-card-content">
                <div className="product-image-container">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="product-image"
                  />
                  <span className="product-icon">{productIcons[index]}</span>
                </div>
                <div className="product-title">{product.title}</div>
                <div className="product-size">{product.size}</div>
                <p className="product-text">{product.description}</p>
              </div>
              <div className="product-footer">
                <span className="tag-soft">{product.tag}</span>
                <div className="product-indicator">
                  <div className={`indicator-dot ${selectedProduct === index ? 'active' : ''}`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div 
          ref={summaryRef}
          className={`card product-summary ${selectedProduct >= 0 ? 'visible' : ''}`} 
          id="productSummary"
          style={{ 
            background: `linear-gradient(135deg, 
              rgba(255,255,255,0.95), 
              rgba(255,255,255,0.98)),
              ${productGradients[selectedProduct].replace(')', ', 0.03)')}`
          }}
        >
          <div className="summary-header">
            <h3 className="card-title">{products[selectedProduct].title}</h3>
            <span className="summary-tag">{products[selectedProduct].tag}</span>
          </div>
          <p className="card-text">{products[selectedProduct].description}</p>
          <div className="summary-actions">
            <button className="btn btn-primary pulse-animation">
              <span className="btn-icon">💧</span>
              Order Now
            </button>
            <button className="btn btn-outline">
              <span className="btn-icon">ℹ️</span>
              Learn More
            </button>
          </div>
          <div className="product-dots">
            {products.map((_, index) => (
              <button
                key={index}
                className={`dot ${selectedProduct === index ? 'active' : ''}`}
                onClick={() => handleProductClick(index)}
                aria-label={`Select product ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;