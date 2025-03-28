import React from 'react';
import { useNavigate } from 'react-router-dom';

const CtaSection = () => {
  const navigate = useNavigate();

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">Ready to revolutionize your document workflow?</h2>
          <p className="cta-subtitle">
            Join industry leaders who trust our platform for mission-critical engineering documentation
          </p>
          <div className="cta-buttons">
            <button 
              onClick={() => navigate('/login')}
              className="btn btn-primary btn-large"
            >
              Start Free Trial
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="btn btn-secondary btn-large"
            >
              Contact Sales
            </button>
          </div>
          <div className="cta-note">
            <span>No credit card required • 14-day trial • Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;