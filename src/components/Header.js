import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ scrollToId, hidden }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'why', 'products', 'process', 'order', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          if (
            scrollPosition >= el.offsetTop &&
            scrollPosition < el.offsetTop + el.offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    scrollToId(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={hidden ? 'hidden' : ''}>
      <nav className="nav">
        {/* BRAND */}
        <div className="brand" onClick={() => handleNavClick('hero')}>
          <img
            src="images/360/bottle-360/LogoDesign.png"
            alt="AquaPureX"
            className="brand-logo"
          />
          <div>
            <div className="brand-text-title">AquaPureX</div>
            <div className="brand-text-sub">Pure Water – Advanced Technology</div>
          </div>
        </div>

        {/* LINKS */}
        <div className="nav-links">
          {['hero', 'why AquaPureX', 'products', 'process', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={activeSection === item ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item);
              }}
            >
              {item === 'hero'
                ? 'Home'
                : item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </div>

{/* CTA */}
<div
  className="nav-cta"
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  }}
>
  <button
    onClick={() => handleNavClick('contact')}
    style={{
      padding: '0.67rem 1.2rem',
      borderRadius: '999px',
      fontSize: '0.95rem',
      fontWeight: 700,
      border: 'none',
      cursor: 'pointer',
      background: 'rgb(0, 95, 175)',
      color: '#fff',
      transition: 'all 0.3s ease'
    }}
  >
    Call Us
  </button>

  <button
    onClick={() => handleNavClick('order')}
    style={{
      padding: '0.67rem 1.2rem',
      borderRadius: '999px',
      fontSize: '0.95rem',
      fontWeight: 700,
      border: 'none',
      cursor: 'pointer',
      background: 'rgb(0, 95, 175)',
      color: '#fff',
      transition: 'all 0.3s ease'
    }}
  >
    Order Online
  </button>
</div>



        {/* MOBILE TOGGLE */}
        <button
          className={`nav-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
        </button>
      </nav>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="nav-mobile">
          {['hero', 'why AquaPureX', 'products', 'process', 'order', 'contact'].map((item) => (
            <a key={item} onClick={() => handleNavClick(item)}>
              {item === 'hero'
                ? 'Home'
                : item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
