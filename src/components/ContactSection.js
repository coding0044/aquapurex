import React, { useState, useRef } from 'react';
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  const openWhatsApp = () => {
    const phone = '923021724801';
    const msg = encodeURIComponent('Salam AquaPureX, I need help with an inquiry.');
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  const callNow = () => {
    window.location.href = 'tel:03020758141';
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
          <div>
            <div className="card" style={{marginBottom: '1rem'}}>
              <h3 className="card-title">Contact Details</h3>
              <p className="card-text"><strong>Phone:</strong> 0302-0758141 · 0371-1724801</p>
              <p className="card-text"><strong>Address:</strong> Ali Town, Main Boulevard, Johar Town, Lahore</p>
              <p className="card-text"><strong>Hours:</strong> 9:00 AM – 10:00 PM, 7 days a week</p>
              
              <div style={{marginTop: '1rem', display: 'flex', gap: '0.5rem'}}>
                <button className="btn btn-primary btn-3d" onClick={callNow}>
                  Call Now
                </button>
                <button className="btn btn-outline btn-3d" onClick={openWhatsApp}>
                  WhatsApp
                </button>
              </div>
            </div>
          </div>

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
                  
                  {submitStatus === 'success' && (
                    <div style={{color: 'green', fontSize: '0.8rem', padding: '0.5rem', background: 'rgba(0,255,0,0.1)', borderRadius: '5px'}}>
                      ✓ Thank you! Our team will contact you shortly.
                    </div>
                  )}
                  
                  <button 
                    className="btn btn-primary btn-3d" 
                    type="submit" 
                    style={{width: 'max-content'}}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
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