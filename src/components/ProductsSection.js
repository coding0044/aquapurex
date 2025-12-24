import React, { useState, useRef, useEffect } from "react";
import "./ProductsSection.css";
import { useInView } from "react-intersection-observer";

const ProductsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  const [ref] = useInView({
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
      images: ["images/360/bottle-360/pic1.png"],
    },
    {
      id: 2,
      title: "19L Home & Office Bottle",
      size: "For dispensers, families & workplaces",
      description:
        "Our signature large-format bottle, ideal for water dispensers in homes, offices, clinics, and shops.",
      tag: "Most Popular",
      images: ["images/360/bottle-360/pic2.png"],
    },
    {
      id: 3,
      title: "19L Home & Office Bottle",
      size: "For dispensers, families & workplaces",
      description:
        "Our signature large-format bottle, ideal for water dispensers in homes, offices, clinics, and shops.",
      tag: "Most Popular",
      images: ["images/360/bottle-360/pic3.jpeg"],
    },
    //   {
    //   id: 3,
    //   title: "19L Home & Office Bottle",
    //   size: "For dispensers, families & workplaces",
    //   description:
    //     "Our signature large-format bottle, ideal for water dispensers in homes, offices, clinics, and shops.",
    //   tag: "Most Popular",
    //   images: ["images/360/bottle-360/pic4.png"],
    // },
  ];

  /* Auto Play */
  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayRef.current = setInterval(() => {
      setSelectedProduct((prev) => (prev + 1) % products.length);
    }, 4000);

    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying, products.length]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    clearInterval(autoPlayRef.current);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const openWhatsAppOrder = (productName) => {
    const phone = "+923711724801";
    const msg = encodeURIComponent(
      `Assalam-o-Alaikum AquaPureX, I want to order 19L bottles.
       Name: 
       Phone:
       Quantity:
       Area: 
       Address: 
       Preferred Time: `
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
  };

  const handleProductClick = (index) => {
    if (isAnimating || selectedProduct === index) return;
    setIsAnimating(true);
    setSelectedProduct(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section id="products" className="products-section" ref={ref}>
      <div className="section-kicker">Our Premium Products</div>

 <p className="section-description">
        We offer a wide range of premium bottled water, including 19-liter,
        6-liter, 1.5-liter, and 500-ml bottles.
      </p>

      <div className="products-inner">
        <div className="product-column">
          <div
            className="product-card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="counter-badge">
              {selectedProduct + 1} / {products.length}
            </div>

            <div className="slider-container">
              <div className="slider-wrapper">
                <div
                  className="slider-track"
                  style={{
                    transform: `translateX(-${selectedProduct * (100 / products.length)}%)`,
                  }}
                >
                  {products.map((product) => (
                    <div className="slide" key={product.id}>
                      <div className="product-header">
                        <div className="product-image-container">
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="product-image"
                            onError={(e) =>
                              (e.target.src =
                                "https://via.placeholder.com/280x280/003b73/ffffff?text=AquaPureX")
                            }
                          />
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

              <div className="slide-indicators">
                {products.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${
                      selectedProduct === index ? "active" : ""
                    }`}
                    onClick={() => handleProductClick(index)}
                    aria-label={`Go to product ${index + 1}`}
                  />
                ))}
              </div>

              <div className="slider-progress">
                <div
                  className="progress-bar"
                  style={{
                    width: isAutoPlaying ? "100%" : "0%",
                    transition: isAutoPlaying ? "width 4s linear" : "none",
                  }}
                />
              </div>
            </div>

            <p className="product-description">
              {products[selectedProduct].description}
            </p>

            <div className="product-actions">
              <button
                className="btn btn-primary pulse-animation"
                onClick={() =>
                  openWhatsAppOrder(products[selectedProduct].title)
                }
              >
                💧 Order Now on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;