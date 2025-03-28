import React from 'react';
import { 
  FaCloudUploadAlt, 
  FaHistory, 
  FaLock, 
  FaSearch,
  FaUsers,
  FaFileContract,
  FaShieldAlt
} from 'react-icons/fa';
import { 
  MdEngineering, 
  MdOutlineWaterDrop,
  MdOutlineAutoAwesome
} from 'react-icons/md';
import { BsFillCalendarCheckFill, BsDiagram3 } from 'react-icons/bs';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaCloudUploadAlt />,
      title: "Document Control",
      description: "Check-in/check-out functionality with automatic version numbering"
    },
    {
      icon: <FaHistory />,
      title: "Version History",
      description: "Complete audit trails with document comparison tools"
    },
    {
      icon: <FaLock />,
      title: "Role-Based Access",
      description: "Granular permissions and document-level security"
    },
    {
      icon: <MdEngineering />,
      title: "CAD Integration",
      description: "Direct integration with AutoCAD, Revit, and BIM 360"
    },
    {
      icon: <BsDiagram3 />,
      title: "Transmittals",
      description: "Automated document transmittal creation and tracking"
    },
    {
      icon: <FaFileContract />,
      title: "DCI Management",
      description: "Document Control Index with automatic updates"
    },
    {
      icon: <MdOutlineWaterDrop />,
      title: "Watermarking",
      description: "Dynamic watermarking for downloaded documents"
    },
    {
      icon: <BsFillCalendarCheckFill />,
      title: "Submission Tracking",
      description: "Deadline monitoring with automated reminders"
    },
    {
      icon: <MdOutlineAutoAwesome />,
      title: "AI Suggestions",
      description: "Smart document categorization and tagging"
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Features</span>
          <h2 className="section-title">Engineered for Complex Projects</h2>
          <p className="section-subtitle">
            Comprehensive tools designed specifically for engineering documentation needs
          </p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-container">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-learn-more">
                <span>Learn more →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;