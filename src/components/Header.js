import React, { useState, useEffect } from 'react';

const Header = ({ scrollToId, hidden }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'why', 'products', 'process', 'order', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (sectionId) => {
    scrollToId(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={hidden ? 'hidden' : ''}>
      <nav className="nav">
        <div className="brand" onClick={() => handleNavClick('hero')}>
          <div className="brand-logo">
            <img src="images/360/bottle-360/LogoDesign.png" alt="AquaPureX logo" />
          </div>
          <div>
            <div className="brand-text-title">AquaPureX</div>
            <div className="brand-text-sub">Pure Water – Advanced Technology</div>
          </div>
        </div>

        <div className="nav-links">
          <a 
            href="#hero" 
            className={activeSection === 'hero' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
          >
            Home
          </a>
          <a 
            href="#why" 
            className={activeSection === 'why' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('why');
            }}
          >
            Why AquaPureX
          </a>
          <a 
            href="#products" 
            className={activeSection === 'products' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('products');
            }}
          >
            Products
          </a>
          <a 
            href="#process" 
            className={activeSection === 'process' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('process');
            }}
          >
            Purification
          </a>
          <a 
            href="#contact" 
            className={activeSection === 'contact' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
          >
            Contact
          </a>
        </div>

        <div className="nav-cta">
          <button className="btn btn-outline btn-3d" onClick={() => handleNavClick('contact')}>
            <span>Call Us</span>
          </button>
          <button className="btn btn-primary btn-3d" onClick={() => handleNavClick('order')}>
            <span>Order Online</span>
          </button>
        </div>

        <button 
          className={`nav-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          <span></span>
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="nav-mobile">
          <a href="#hero" onClick={() => handleNavClick('hero')}>Home</a>
          <a href="#why" onClick={() => handleNavClick('why')}>Why AquaPureX</a>
          <a href="#products" onClick={() => handleNavClick('products')}>Products</a>
          <a href="#process" onClick={() => handleNavClick('process')}>Purification</a>
          <a href="#order" onClick={() => handleNavClick('order')}>Order Online</a>
          <a href="#contact" onClick={() => handleNavClick('contact')}>Contact</a>
        </div>
      )}
    </header>
  );
};

export default Header;