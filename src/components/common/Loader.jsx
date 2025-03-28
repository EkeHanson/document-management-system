// src/components/common/Loader.jsx
import React from 'react';
import './Loader.css'; // Optional styling file

const Loader = ({ fullScreen = false }) => {
  return (
    <div className={`loader-container ${fullScreen ? 'full-screen' : ''}`}>
      <div className="loader-spinner"></div>
    </div>
  );
};

export default Loader; // This is the crucial default export