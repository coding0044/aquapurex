import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ scrollToId }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    let scrollTimeout = null;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Clear any existing timeout
          if (scrollTimeout) clearTimeout(scrollTimeout);
          
          // Always show header when scrolling up
          if (currentScrollY < lastScrollY) {
            setHidden(false);
          }
          // Hide header with delay when scrolling down AND we're past 100px
          else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            scrollTimeout = setTimeout(() => {
              setHidden(true);
            }, 100);
          }
          
          // Always show at top (within 50px from top)
          if (currentScrollY < 50) {
            setHidden(false);
          }
          
          setLastScrollY(currentScrollY);
          
          // Active section highlight
          const sections = ['hero', 'why', 'products', 'process', 'order', 'contact'];
          const scrollPosition = currentScrollY + 100;
          
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
          
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [lastScrollY]);

  // WhatsApp Order Function
  const openWhatsAppOrder = () => {
    const phone = '+923711724801';
    const msg = encodeURIComponent('Salam AquaPureX, I would like to place a water order.');
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  // Direct Call Function
  const makePhoneCall = () => {
    window.open('tel:+923711724801');
  };

  const handleNavClick = (id) => {
    scrollToId(id);
    setIsMobileMenuOpen(false);
  };

  // Handle Order Online click - opens WhatsApp directly
  const handleOrderOnlineClick = (e) => {
    e.preventDefault();
    openWhatsAppOrder();
    setIsMobileMenuOpen(false);
  };

  // Handle Call Us click - makes phone call directly
  const handleCallUsClick = (e) => {
    e.preventDefault();
    makePhoneCall();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
    

      {/* HEADER */}
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
              <div className="brand-text-title" style={{marginTop:'-15px'}}>AquaPureX</div>
              <div className="brand-text-sub">
                Pure Water – Advanced Technology 
                <br /> Since 2015
              </div>
            </div>

          </div>

          {/* DESKTOP LINKS */}
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

          {/* DESKTOP CTA BUTTONS */}
          <div className="nav-cta">
            <button
              className="btn-action call-btn"
              onClick={handleCallUsClick}
            >
              <span className="btn-icon"></span> Call Us
            </button>
            <button
              className="btn-action order-btn"
              onClick={handleOrderOnlineClick}
            >
              <span className="btn-icon"></span> Order Now
            </button>
          </div>

          {/* MOBILE TOGGLE BUTTON */}
          <button
            className={`nav-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
          </button>
        </nav>

        {/* MOBILE MENU */}
        <div className={`nav-mobile ${isMobileMenuOpen ? 'open' : ''}`}>
          {['hero', 'why AquaPureX', 'products', 'process', 'contact'].map(
            (item) => (
              <a 
                key={item} 
                className={activeSection === item ? 'active' : ''}
                onClick={() => handleNavClick(item)}
              >
                {item === 'hero'
                  ? 'Home'
                  : item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            )
          )}
          {/* MOBILE CTA BUTTONS */}
          <div className="mobile-cta-buttons">
            <button
              className="btn-action call-btn"
              onClick={handleCallUsClick}
            >
              <span className="btn-icon"></span> Call Us
            </button>
            <button
              className="btn-action order-btn"
              onClick={handleOrderOnlineClick}
            >
              <span className="btn-icon"></span> Order Now
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;