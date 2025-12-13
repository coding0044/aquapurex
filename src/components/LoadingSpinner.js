import React from 'react';

const LoadingSpinner = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, var(--navy), var(--primary))',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      color: 'white'
    }}>
      <div className="wave-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h2 style={{marginTop: '2rem', fontFamily: 'Poppins, sans-serif'}}>AquaPureX</h2>
      <p style={{opacity: 0.8, marginTop: '0.5rem'}}>Loading Pure Hydration Experience...</p>
    </div>
  );
};

export default LoadingSpinner;