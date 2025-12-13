import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ scrollToId }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 🔽 Hide header when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setHidden(true);
      }
      // 🔼 Show header when scrolling up
      else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);

      // Active section highlight
      const sections = ['hero', 'why', 'products', 'process', 'order', 'contact'];
      const scrollPosition = currentScrollY + 150;

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
  }, [lastScrollY]);

  const handleNavClick = (id) => {
    scrollToId(id);
    setIsMobileMenuOpen(false);
  };

  return (
    
    <header className={hidden ? 'hidden' : ''}>
         <div class="top-bar">
  <span class="left-text" style={{
        fontSize:'17px',

  }}>Free Home Delivery in Lahore</span>

  <div class="top-bar-phones" style={{
    fontSize:'17px',
  }}>
    <span  style={{
    marginRight:'28px',
  }}>Call: 0302-0758141 · 0371-1724801</span>
    <span class="pill" >WhatsApp Orders Available</span>
  </div>
</div>
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
            <div className="brand-text-sub">
              Pure Water – Advanced Technology
            </div>
          </div>
        </div>

        {/* LINKS */}
        <div className="nav-links">
          {['hero', 'why', 'products', 'process', 'contact'].map((item) => (
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
        <div className="nav-cta" >
          <button
            className="btn-action"
            onClick={() => handleNavClick('contact')}
          style={{
          background:'rgb(0, 95, 175)',
        }}>
            Call Us
          </button>

          <button
            className="btn-action"
            onClick={() => handleNavClick('order')}
          style={{
          background:'rgb(0, 95, 175)',
        }}>
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
          {['hero', 'why', 'products', 'process', 'order', 'contact'].map(
            (item) => (
              <a key={item} onClick={() => handleNavClick(item)}>
                {item === 'hero'
                  ? 'Home'
                  : item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            )
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
