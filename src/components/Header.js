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

  // WhatsApp Order Function
  const openWhatsAppOrder = () => {
    const phone = '923021724801';
    const msg = encodeURIComponent('Salam AquaPureX, I would like to place a water order.');
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  // Direct Call Function
  const makePhoneCall = () => {
    window.open('tel:+923021724801');
  };

  const handleNavClick = (id) => {
    scrollToId(id);
    setIsMobileMenuOpen(false);
  };

  // Handle Order Online click - opens WhatsApp directly
  const handleOrderOnlineClick = (e) => {
    e.preventDefault();
    openWhatsAppOrder();
    // Optional: Close mobile menu if open
    setIsMobileMenuOpen(false);
  };

  // Handle Call Us click - makes phone call directly
  const handleCallUsClick = (e) => {
    e.preventDefault();
    makePhoneCall();
    // Optional: Close mobile menu if open
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
            <div className="brand-text-sub">
              Pure Water – Advanced Technology
            </div>
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
        <div className="nav-cta">
          {/* Call Us Button - Direct Phone Call */}
          <button
            className="btn-action call-btn"
            onClick={handleCallUsClick}
            style={{
              background: 'rgb(0, 95, 175)',
            }}
          >
            Call Us
          </button>

          {/* Order Online Button - Direct WhatsApp */}
          <button
            className="btn-action order-btn"
            onClick={handleOrderOnlineClick}
            style={{
              background: 'rgb(0, 95, 175)',
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
          {['hero', 'why AquaPureX', 'products', 'process', 'contact'].map(
            (item) => (
              <a key={item} onClick={() => handleNavClick(item)}>
                {item === 'hero'
                  ? 'Home'
                  : item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            )
          )}
          {/* Mobile CTA Buttons */}
          <div className="mobile-cta-buttons">
            <button
              className="btn-action call-btn"
              onClick={handleCallUsClick}
            >
               Call Us
            </button>
            <button
              className="btn-action order-btn"
              onClick={handleOrderOnlineClick}
            >
               Order Online
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;