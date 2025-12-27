import React, { useEffect } from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = ({ scrollToId }) => {
  useEffect(() => {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }, []);

  const handleSocialClick = (platform) => {
    const urls = {
      facebook: '',
      instagram: '',
      whatsapp: 'https://wa.me/+923711724801'
    };
    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">

          {/* BRAND / ABOUT */}
          <div>
            <div className="brand" onClick={() => scrollToId('hero')}>
              <div className="brand-logo">
                <img src="images/360/bottle-360/LogoDesign.png" alt="AquaPureX logo" />
              </div>
              <div>

              <div className="brand-text-title" >Aqua <p className='pure'>PureX</p></div>

                <div className="brand-text-sub">Pure Water – Advanced Technology 
                 </div>
              </div>
            </div>
            <p>
              <br />
Established Since 2015 Licensed by Punjab Food Authority           </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <div className="footer-heading">Quick Links</div>
            <div className="footer-links">
              <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToId('hero'); }}>Home</a>
              <a href="#why-AquaPureX" onClick={(e) => { e.preventDefault(); scrollToId('why-AquaPureX'); }}>Why AquaPureX</a>
              <a href="#products" onClick={(e) => { e.preventDefault(); scrollToId('products'); }}>Products</a>
              <a href="#process" onClick={(e) => { e.preventDefault(); scrollToId('process'); }}>Purification</a>
              <a href="#order" onClick={(e) => { e.preventDefault(); scrollToId('contact'); }}>Order Online</a>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <div className="footer-heading">Contact</div>
            <div className="footer-links">
              <span>Phone: 0371-1724801</span>
              <span>Ali Town, Main Boulevard, Johar Town, Lahore</span>
              <span>Hours: 8:00 AM – 11:00 PM</span>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="footer-bottom">
          <span>© <span id="currentYear"></span> AquaPureX. All rights reserved.</span>
          <div className="socials">
            <div className="social-pill facebook" title="Facebook" onClick={() => handleSocialClick('facebook')}>
              <FaFacebookF size={18} />
            </div>
            <div className="social-pill instagram" title="Instagram" onClick={() => handleSocialClick('instagram')}>
              <FaInstagram size={18} />
            </div>
            <div className="social-pill whatsapp" title="WhatsApp" onClick={() => handleSocialClick('whatsapp')}>
              <FaWhatsapp size={18} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
