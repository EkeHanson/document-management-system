import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaLinkedin, 
  FaTwitter, 
  FaYoutube,
  FaGithub
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <h3 className="footer-title">EngineeringDMS</h3>
            <p className="footer-description">
              The complete document management solution for engineering teams
            </p>
            <div className="footer-social">
              <a href="#"><FaLinkedin /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaYoutube /></a>
              <a href="#"><FaGithub /></a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h4 className="link-group-title">Product</h4>
              <Link to="/features">Features</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/integrations">Integrations</Link>
              <Link to="/roadmap">Roadmap</Link>
            </div>
            
            <div className="link-group">
              <h4 className="link-group-title">Resources</h4>
              <Link to="/blog">Blog</Link>
              <Link to="/webinars">Webinars</Link>
              <Link to="/docs">Documentation</Link>
              <Link to="/api">API</Link>
            </div>
            
            <div className="link-group">
              <h4 className="link-group-title">Company</h4>
              <Link to="/about">About Us</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/partners">Partners</Link>
            </div>
            
            <div className="link-group">
              <h4 className="link-group-title">Legal</h4>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/security">Security</Link>
              <Link to="/compliance">Compliance</Link>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} EngineeringDMS. All rights reserved.
          </div>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;