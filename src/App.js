import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhySection from './components/WhySection';
import ProductsSection from './components/ProductsSection';
import ProcessSection from './components/ProcessSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import WaterDrops from './components/WaterDrops';
import WaveAnimation from './components/WaveAnimation';
import LoadingSpinner from './components/LoadingSpinner';
import Bottle360Viewer from "./components/Bottle360Viewer";


function App() {
  const [headerHidden, setHeaderHidden] = useState(false);
  const [loading, setLoading] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHeaderHidden(true);
      } else {
        setHeaderHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="page-wrapper">
      <WaterDrops />
      <WaveAnimation />
   <div class="top-bar">
  <span class="left-text">Free Home Delivery in Lahore</span>

  <div class="top-bar-phones" style={{
    fontSize:'15px',
  }}>
    <span>Call: 0302-0758141 · 0371-1724801</span>
    <span class="pill">WhatsApp Orders Available</span>
  </div>
</div>


      <Header scrollToId={scrollToId} hidden={headerHidden} />

      <main>

        <Hero scrollToId={scrollToId} />

        <WhySection />
        <ProductsSection />
        <ProcessSection />
        <TestimonialsSection scrollToId={scrollToId} />
        <ContactSection />
      </main>

      <Footer scrollToId={scrollToId} />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;