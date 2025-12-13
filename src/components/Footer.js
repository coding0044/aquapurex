import React, { useEffect } from 'react';
import './Footer.css';

const Footer = ({ scrollToId }) => {
  useEffect(() => {
    // Update year automatically
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }, []);

  const handleSocialClick = (platform) => {
    const urls = {
      facebook: 'https://facebook.com/aquapurex',
      instagram: 'https://instagram.com/aquapurex',
      whatsapp: 'https://wa.me/923021724801'
    };
    
    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  };

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{marginBottom: '0.75rem'}} onClick={() => scrollToId('hero')}>
              <div className="brand-logo" style={{
                    width: '70px',
    height: '70px',
    borderRadius: '4px'
              }}>
                <img src="images/360/bottle-360/LogoDesign.png" alt="AquaPureX logo" />
              </div>
              <div>
                <div className="brand-text-title" style={{color: '#fff'}}>AquaPureX</div>
                <div className="brand-text-sub" style={{color: 'rgba(255,255,255,0.8)'}}>
                  Pure Water – Advanced Technology
                </div>
              </div>
            </div>
            <p style={{fontSize: '0.85rem', color: 'rgba(255,255,255,0.82)', maxWidth: '320px'}}>
              AquaPureX delivers premium, lab-tested drinking water with advanced RO + UV purification and balanced minerals, trusted by families across Lahore.
            </p>
          </div>

          <div>
            <div className="footer-heading">Quick Links</div>
            <div className="footer-links">
              <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToId('hero'); }}>Home</a>
              <a href="#why" onClick={(e) => { e.preventDefault(); scrollToId('why'); }}>Why AquaPureX</a>
              <a href="#products" onClick={(e) => { e.preventDefault(); scrollToId('products'); }}>Products</a>
              <a href="#process" onClick={(e) => { e.preventDefault(); scrollToId('process'); }}>Purification</a>
              <a href="#order" onClick={(e) => { e.preventDefault(); scrollToId('order'); }}>Order Online</a>
            </div>
          </div>

          <div>
            <div className="footer-heading">Contact</div>
            <div className="footer-links">
              <span>Phone: 0302-0758141 · 0371-1724801</span>
              <span>Ali Town, Main Boulevard, Johar Town, Lahore</span>
              <span>Hours: 9:00 AM – 10:00 PM</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© <span id="currentYear"></span> AquaPureX. All rights reserved.</span>
          <div className="socials">
            <div 
              className="social-pill" 
              title="Facebook"
              onClick={() => handleSocialClick('facebook')}
            >
              f
            </div>
            <div 
              className="social-pill" 
              title="Instagram"
              onClick={() => handleSocialClick('instagram')}
            >
              ◎
            </div>
            <div 
              className="social-pill" 
              title="WhatsApp"
              onClick={() => handleSocialClick('whatsapp')}
            >
              ☏
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;