import React, { useState } from 'react';
import './ContactSection.css';
import { useInView } from 'react-intersection-observer';

const ContactSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Send WhatsApp message from form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, phone, message } = formData;

    if (!name || !phone || !message) return;

    const text = `Salam AquaPureX, I have a quick inquiry.\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;
    const url = `https://wa.me/+923711724801?text=${encodeURIComponent(text)}`;

    window.open(url, '_blank');

    // Reset form
    setFormData({ name: '', phone: '', message: '' });
  };

  // Direct WhatsApp contact
  const openWhatsApp = () => {
    
    const phone = '+923711724801';
    const msg = encodeURIComponent('Salam AquaPureX, I need help with an inquiry.');
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  // Direct phone call
  const callNow = () => {
    window.location.href = 'tel:++923711724801';
  };

  return (
    <section id="contact">
      <div className="section-inner">
        <div className={`section-header ${inView ? 'section-visible' : ''}`} ref={ref}>
          <div className="section-kicker">Contact</div>
          <h2 className="section-title">We're Here to Help.</h2>
          <p className="section-subtitle">
            Have questions about delivery areas, bulk orders, or partnerships? Reach out to our team and we'll be happy to assist.
          </p>
        </div>

        <div className="split">
          {/* Contact Details */}
          <div>
            <div className="card" style={{marginBottom: '1rem'}}>
              <h3 className="card-title">Contact Details</h3>
              <p className="card-text"><strong>Phone:</strong> 0371-1724801</p>
              <p className="card-text"><strong>Address:</strong> Ali Town, Main Boulevard, Johar Town, Lahore</p>
              <p className="card-text"><strong>Hours:</strong> 9:00 AM – 10:00 PM, 7 days a week</p>
              
              <div style={{marginTop: '1rem', display: 'flex', gap: '0.5rem'}}>
                <button className="btn btn-primary btn-3d" onClick={callNow} style={{color:'white'}}>
                  Call Now
                </button>
                <button className="btn btn-outline btn-3d" onClick={openWhatsApp}>
                  WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div>
            <div className="card">
              <h3 className="card-title">Quick Inquiry</h3>
              <p className="card-text" style={{marginBottom: '0.7rem'}}>
                Share your name, number, and message — our team will get back to you.
              </p>
              
              <form onSubmit={handleFormSubmit}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.86rem'}}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{padding: '0.55rem 0.7rem', borderRadius: '9px', border: '1px solid rgba(0,0,0,0.12)', outline: 'none'}}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    style={{padding: '0.55rem 0.7rem', borderRadius: '9px', border: '1px solid rgba(0,0,0,0.12)', outline: 'none'}}
                  />
                  <textarea
                    rows="3"
                    name="message"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    style={{padding: '0.55rem 0.7rem', borderRadius: '9px', border: '1px solid rgba(0,0,0,0.12)', outline: 'none'}}
                  ></textarea>

                  <button 
                    className="btn btn-primary btn-3d" 
                    type="submit" 
                    style={{width: 'max-content'}}
                  >
                    Send Message via WhatsApp
                  </button>

                  <small style={{color: 'var(--text-muted)'}}>
                    For urgent orders, please call or WhatsApp directly.
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
