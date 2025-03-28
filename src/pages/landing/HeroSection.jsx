import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt } from 'react-icons/fa';
import DMSdashboard from '../../assets/images/dms-dashboard.jpg'

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <header className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-icon">
            <FaCloudUploadAlt />
          </div>
          <h1 className="hero-title">
            <span className="hero-title-main">Engineering</span>
            <span className="hero-title-sub">Document Management System</span>
          </h1>
          <p className="hero-subtitle">
            Secure, version-controlled document management for complex engineering projects
          </p>
          <div className="hero-buttons">
            <button 
              onClick={() => navigate('/login')}
              className="btn btn-primary"
            >
              Get Started
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="btn btn-secondary"
            >
              <span className="btn-icon">▶</span> Watch Demo
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">Documents Managed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Engineering Teams</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src={DMSdashboard}
            alt="DMS Dashboard Preview" 
          />
        </div>
      </div>
    </header>
  );
};

export default HeroSection;