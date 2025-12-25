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
    bottles: '1',
    location: '',
    address: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Full name is required';
        else if (value.trim().length < 2) error = 'Name must be at least 2 characters';
        break;
      case 'phone':
        if (!value.trim()) error = 'Phone number is required';
        else if (!/^03\d{9}$/.test(value.replace(/\D/g, ''))) error = 'Enter a valid Pakistani number (03XXXXXXXXX)';
        break;
      case 'location':
        if (!value.trim()) error = 'Location is required';
        break;
      case 'address':
        if (!value.trim()) error = 'Delivery address is required';
        else if (value.trim().length < 10) error = 'Please provide a complete address';
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) { newErrors.name = 'Full name is required'; isValid = false; }
    else if (formData.name.trim().length < 2) { newErrors.name = 'Name must be at least 2 characters'; isValid = false; }

    if (!formData.phone.trim()) { newErrors.phone = 'Phone number is required'; isValid = false; }
    else if (!/^03\d{9}$/.test(formData.phone.replace(/\D/g, ''))) { newErrors.phone = 'Enter a valid Pakistani number (03XXXXXXXXX)'; isValid = false; }

    if (!formData.location.trim()) { newErrors.location = 'Location is required'; isValid = false; }

    if (!formData.address.trim()) { newErrors.address = 'Delivery address is required'; isValid = false; }
    else if (formData.address.trim().length < 10) { newErrors.address = 'Please provide a complete address'; isValid = false; }

    setErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, location: true, address: true });

    if (!validateForm()) {
      const firstErrorField = document.querySelector('.error');
      if (firstErrorField) firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const { name, phone, bottles, location, address, notes } = formData;

    const text =
      `Assalam-o-Alaikum AquaPureX 

I would like to place a new order for 19L Water Bottles.

Customer Details
━━━━━━━━━━━━━━
Name: ${name}
Mobile: ${phone}

Order Details
━━━━━━━━━━━━━━
Number of 19L Bottles: ${bottles}
Area / Location: ${location}

Delivery Address
━━━━━━━━━━━━━━
${address}

Additional Notes
━━━━━━━━━━━━━━
${notes || 'No special instructions'}`;

    const url = `https://wa.me/+923711724801?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');

    setFormData({ name: '', phone: '', bottles: '1', location: '', address: '', notes: '' });
    setErrors({});
    setTouched({});
  };

  const openWhatsApp = () => {
    const phone = '+923711724801';
    const msg = encodeURIComponent('Salam AquaPureX, I need help with an order.');
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  const callNow = () => {
    window.location.href = 'tel:+923711724801';
  };

  const bottleOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20];

  return (
    <section id="contact">
      <div className="section-inner">
        <div className={`section-header ${inView ? 'section-visible' : ''}`} ref={ref}>
          <div className="section-kicker">Order Now</div>
          <h2 className="section-title">Get Pure Water Delivered to Your Doorstep</h2>
          <p className="section-subtitle">
            Place your order for 19L water bottles. Fill in the details below and we'll deliver to your location.
          </p>
        </div>

        <div>
          <div className="card">
            <h3 className="card-title">Place Your Order</h3>
            <p className="card-text" style={{ marginBottom: '1.2rem' }}>
              Fill in your details and submit to order via WhatsApp
            </p>

            <form onSubmit={handleFormSubmit} noValidate>
              <div className="order-form">

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input type="text" id="name" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleInputChange} onBlur={handleBlur} className={errors.name ? 'error' : ''} />
                    {errors.name && <div className="error-message">{errors.name}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Mobile Number *</label>
                    <input type="tel" id="phone" name="phone" placeholder="03xx-xxxxxxx" value={formData.phone} onChange={handleInputChange} onBlur={handleBlur} className={errors.phone ? 'error' : ''} />
                    {errors.phone && <div className="error-message">{errors.phone}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="bottles">Number of 19L Bottles *</label>
                    <input
                      type="number"
                      id="bottles"
                      name="bottles"
                      value={formData.bottles}
                      onChange={handleInputChange}
                      min="1"
                      placeholder="Enter number of bottles"
                      required
                    />
                  </div>


                  <div className="form-group">
                    <label htmlFor="location">Location / Area *</label>
                    <input type="text" id="location" name="location" placeholder="e.g., Johar Town, Lahore" value={formData.location} onChange={handleInputChange} onBlur={handleBlur} className={errors.location ? 'error' : ''} />
                    {errors.location && <div className="error-message">{errors.location}</div>}
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="address">Delivery Address *</label>
                  <textarea id="address" name="address" placeholder="House/Shop no, street, block, landmark..." rows="3" value={formData.address} onChange={handleInputChange} onBlur={handleBlur} className={errors.address ? 'error' : ''}></textarea>
                  {errors.address && <div className="error-message">{errors.address}</div>}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="notes">Additional Notes (optional)</label>
                  <textarea id="notes" name="notes" placeholder="Preferred delivery time, special instructions, etc." rows="2" value={formData.notes} onChange={handleInputChange}></textarea>
                </div>

                <div className="form-buttons">
                  <button className="btn btn-primary btn-3d" type="submit" style={{ width: "200px", background: "linear-gradient(135deg, #005faf 0%, #005faf 100%)" }}>
                    Send on WhatsApp
                  </button>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
