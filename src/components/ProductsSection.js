import React, { useState, useRef } from 'react';
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
      icon: "🏢"
    }
  ];

  const handleProductClick = (index) => {
    if (isAnimating || selectedProduct === index) return;

    setIsAnimating(true);
    setSelectedProduct(index);

    // Smooth scroll to summary on mobile
    if (window.innerWidth < 768) {
      setTimeout(() => {
        summaryRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }, 150);
    }

    // Reset animation state
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    
    <section id="products" className="products">
                    <div className="section-kicker" style={{
                      marginLeft:'600px',
                      marginBottom:'70px'
                    }}>Our Premium Products</div>

      <div className="section-inner">
        {/* Side-by-side layout container */}
        <div className="products-container">
          {/* Left column - Product Details */}
          <div className="product-details-column">
            <div ref={summaryRef} className="card product-summary visible" id="productSummary">
              <div className="summary-header">
                <div className="summary-image">
                  <div className="summary-product-image-placeholder">
                    <span style={{ fontSize: '4rem' }}>{products[selectedProduct].icon}</span>
                  </div>
                </div>
                <div className="summary-text">
                  <h3 className="card-title">{products[selectedProduct].title}</h3>
                  <div className="summary-size">{products[selectedProduct].size}</div>
                  <span className="summary-tag">{products[selectedProduct].tag}</span>
                </div>
              </div>
              <p className="card-text">{products[selectedProduct].description}</p>
              <div className="summary-actions">
                <button className="btn btn-primary pulse-animation">
                  <span className="btn-icon">💧</span>
                  Order Now
                </button>
              </div>
              
              {/* Product highlights section */}
             
            </div>
          </div>

          {/* Right column - Section Header/Intro */}
          <div className="section-header-column">
            <div className={`section-header-content ${inView ? 'section-visible' : ''}`} ref={ref}>
              <br/>
              <h2 className="section-title">Pure Hydration <br /> Solutions</h2>
              <p className="section-subtitle">
                Whether it's for home, office, travel, or school, AquaPureX has a bottle size tailored to your daily routine.
              </p>
              
              {/* Product selector buttons */}
              <div className="product-selector">
                {products.map((product, index) => (
                  <button
                    key={product.id}
                    className={`product-selector-btn ${selectedProduct === index ? 'selected' : ''}`}
                    onClick={() => handleProductClick(index)}
                  >
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;