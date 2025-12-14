import React, { useState, useRef } from 'react';
import './ProductsSection.css';
import { useInView } from 'react-intersection-observer';

const ProductsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const summaryRef = useRef(null);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const products = [
    {
      id: 1,
      title: "19L Home & Office Bottle",
      size: "For dispensers, families & workplaces",
      description:
        "Our signature large-format bottle, ideal for water dispensers in homes, offices, clinics, and shops.",
      tag: "Most Popular",
      image: "images/360/bottle-360/aquapurex-19L-thumb.png",
    },
    // Add more products here if needed
  ];

  // WhatsApp Order Function
  const openWhatsAppOrder = (productName = '') => {
    const phone = '+923711724801';
    const defaultMsg = `Salam AquaPureX, I would like to place an order for ${productName || 'your water product'}.`;
    const msg = encodeURIComponent(defaultMsg);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  // Handle Order Now click with product info
  const handleOrderClick = () => {
    const selectedProductName = products[selectedProduct].title;
    openWhatsAppOrder(selectedProductName);
  };

  const handleProductClick = (index) => {
    if (isAnimating || selectedProduct === index) return;

    setIsAnimating(true);
    setSelectedProduct(index);

    if (window.innerWidth < 768) {
      setTimeout(() => {
        summaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 150);
    }

    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section id="products" className="products-section">
      <div className="section-kicker">Our Premium Products</div>
      <br />
      <br />
      

      <div className="products-inner">
        {/* LEFT COLUMN - PRODUCT SUMMARY */}
        <div className="product-column">
          <div ref={summaryRef} className="product-card">
            <div className="product-header">
              <div className="product-image-container">
                <img
                  src={products[selectedProduct].image}
                  alt={products[selectedProduct].title}
                  className="product-image"
                />
              </div>
              <div className="product-text">
                <h3 className="product-title" style={{
                  marginLeft:'55px'
                }}>{products[selectedProduct].title}</h3>
                <div className="product-size">{products[selectedProduct].size}</div>
                <span className="product-tag">{products[selectedProduct].tag}</span>
              </div>
            </div>

            <p className="product-description">{products[selectedProduct].description}</p>

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

            {/* PRODUCT SELECTOR DOTS */}
            <div className="product-selector">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  className={`selector-btn ${selectedProduct === index ? 'selected' : ''}`}
                  onClick={() => handleProductClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;