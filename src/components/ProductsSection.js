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
      icon: "🏢"
    }
    // You can add more products here
  
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
      <div className="section-inner">
        <div className={`section-header ${inView ? 'section-visible' : ''}`} ref={ref}>
          <div className="section-kicker">Our Premium Products</div>
          <h2 className="section-title">Pure Hydration Solutions</h2>
          <p className="section-subtitle">
            Premium purified water in various sizes to meet all your hydration needs.
          </p>
        </div>

        <div className="products-container">
          {/* Products Grid on the Left Side */}
          <div className="products-grid-side" style={{
            marginTop:'30px'
          }}>
            <div className="product-grid" style={{
              height:'344px'
            }}>
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={`product-card ${selectedProduct === index ? 'selected' : ''} ${isAnimating ? 'animating' : ''}`}
                  onClick={() => handleProductClick(index)}
                >
                  <div className="product-card-content">
                    <div className="product-image-container">
                      <div className="product-image-wrapper">
                        <span className="product-icon-fallback">
                          <span style={{ fontSize: '3rem', marginBottom: '1rem' }}>{product.icon}</span>
                          <span style={{ fontSize: '1rem', color: '#005faf', fontWeight: '600' }}>
                            {product.id === 1 ? '19L Bottle' : product.id === 2 ? '5L Bottle' : '1L Bottle'}
                          </span>
                        </span>
                        <div className="water-drop-overlay"></div>
                      </div>
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
          </div>

          {/* Product Summary on the Right Side */}
          <div className="product-summary-side">
            <div
              ref={summaryRef}
              className={`card product-summary ${selectedProduct >= 0 ? 'visible' : ''}`}
              id="productSummary"
            >
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
                <button className="btn btn-outline">
                  <span className="btn-icon">ℹ️</span>
                  Learn More
                </button>
              </div>
          
            
              
            </div>
          </div>
        </div>
      </div>
      <br />
            <br />
      <br />
      <br />

    </section>
  );
};

export default ProductsSection;