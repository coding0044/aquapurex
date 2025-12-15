import React, { useState, useRef, useEffect } from 'react';
import './ProductsSection.css';
import { useInView } from 'react-intersection-observer';

const ProductsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const products = [
    {
      id: 1,
      title: "19L Home & Office Bottle",
      size: "For dispensers, families & workplaces",
      description: "Our signature large-format bottle, ideal for water dispensers in homes, offices, clinics, and shops.",
      tag: "Most Popular",
      images: ["images/360/bottle-360/pic1.jpg"]
    },
    {
      id: 2,
      title: "19L Home & Office Bottle",
      size: "For dispensers, families & workplaces",
      description: "Our signature large-format bottle, ideal for water dispensers in homes, offices, clinics, and shops.",
      tag: "Most Popular",
      images: ["images/360/bottle-360/pic2.jpg"]
    },
    {
      id: 3,
      title: "19L Home & Office Bottle",
      size: "For dispensers, families & workplaces",
      description: "Our signature large-format bottle, ideal for water dispensers in homes, offices, clinics, and shops.",
      tag: "Most Popular",
      images: ["images/360/bottle-360/pic3.jpg"]
    }
  ];

  // Auto slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayRef.current = setInterval(() => {
      setSelectedProduct(prev => (prev + 1) % products.length);
    }, 4000); // Change slide every 4 seconds

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, products.length]);

  // Toggle auto-play
  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // WhatsApp Order Function
  const openWhatsAppOrder = (productName = '') => {
    const phone = '+923711724801';
    const defaultMsg = `Salam AquaPureX, I would like to place an order for ${productName || 'your water product'}.`;
    const msg = encodeURIComponent(defaultMsg);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  // Handle Order Now click
  const handleOrderClick = () => {
    const selectedProductName = products[selectedProduct].title;
    openWhatsAppOrder(selectedProductName);
  };

  const handleProductClick = (index) => {
    if (isAnimating || selectedProduct === index) return;

    setIsAnimating(true);
    setSelectedProduct(index);

    // Reset auto-play timer
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setSelectedProduct(prev => (prev + 1) % products.length);
      }, 4000);
    }

    setTimeout(() => setIsAnimating(false), 500);
  };

  // Handle next/previous slide
  const nextSlide = () => {
    handleProductClick((selectedProduct + 1) % products.length);
  };

  const prevSlide = () => {
    handleProductClick((selectedProduct - 1 + products.length) % products.length);
  };

  return (
    <section id="products" className="products-section">
      <div className="section-kicker">Our Premium Products</div>
      <br />
      
      <div className="products-inner">
        {/* LEFT COLUMN - PRODUCT SLIDER */}
        <div className="product-column">
          <div 
            className="product-card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Auto-play toggle */}
            <button className="auto-play-toggle" onClick={toggleAutoPlay}>
              <span className="play-icon">{isAutoPlaying ? '⏸️' : '▶️'}</span>
            </button>
            
            {/* Product Counter */}
            <div className="counter-badge">
              {selectedProduct + 1} / {products.length}
            </div>

            {/* Image Slider Container */}
            <div className="slider-container">
              <div className="slider-wrapper">
                <div 
                  className="slider-track" 
                  style={{ 
                    transform: `translateX(-${selectedProduct * 100}%)`,
                    transition: isAnimating ? 'transform 0.5s ease' : 'none'
                  }}
                >
                  {products.map((product, index) => (
                    <div key={product.id} className="slide">
                      <div className="product-header">
                        <div className="product-image-container">
                          <div className="image-carousel">
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="product-image"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/280x280/003b73/ffffff?text=AquaPureX+Water";
                              }}
                            />
                          </div>
                        </div>
                        <div className="product-text">
                          <h3 className="product-title">{product.title}</h3>
                          <div className="product-size">{product.size}</div>
                          <span className="product-tag">{product.tag}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
           
             

              {/* Slide Indicators */}
              <div className="slide-indicators">
                {products.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${selectedProduct === index ? 'active' : ''}`}
                    onClick={() => handleProductClick(index)}
                  />
                ))}
              </div>

              {/* Auto-play progress bar */}
              <div className="slider-progress">
                <div 
                  className="progress-bar"
                  style={{ 
                    width: isAutoPlaying ? '100%' : '0%',
                    transition: isAutoPlaying ? 'width 4s linear' : 'none',
                    animationPlayState: isAutoPlaying ? 'running' : 'paused'
                  }}
                ></div>
              </div>
            </div>

            {/* Product Description */}
            <p className="product-description">{products[selectedProduct].description}</p>

            {/* Order Button */}
            <div className="product-actions">
              <button
                className="btn btn-primary pulse-animation"
                onClick={handleOrderClick}
              >
                <span className="btn-icon">💧</span> Order Now on WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - SECTION HEADER */}
        <div className="header-column">
          <div
            className={`header-content ${inView ? 'visible' : ''}`}
            ref={ref}
          >
            <h2 className="header-title">
              Pure Hydration <br /> Solution
            </h2>
            <p className="header-subtitle">
              AquaPureX combines advanced purification technology with carefully balanced minerals to give you water that is not only safe, but refreshing in every sip.
            </p>

            {/* Product Selector Dots */}
            <div className="product-selector">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  className={`selector-btn ${selectedProduct === index ? 'selected' : ''}`}
                  onClick={() => handleProductClick(index)}
                  aria-label={`Select ${product.title}`}
                >
                  <span className="selector-tooltip">{product.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;