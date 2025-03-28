import React from 'react';
import { 
  FaUpload,
  FaEdit,
  FaShareSquare,
  FaCheckCircle,
  FaArchive
} from 'react-icons/fa';

const WorkflowSection = () => {
  const steps = [
    {
      icon: <FaUpload />,
      title: "Upload",
      description: "Drag & drop or use our intuitive upload interface"
    },
    {
      icon: <FaEdit />,
      title: "Review & Edit",
      description: "Collaborate with version control and markups"
    },
    {
      icon: <FaShareSquare />,
      title: "Share",
      description: "Distribute documents with controlled access"
    },
    {
      icon: <FaCheckCircle />,
      title: "Approve",
      description: "Digital signatures and approval workflows"
    },
    {
      icon: <FaArchive />,
      title: "Archive",
      description: "Automatic retention and archiving"
    }
  ];

  return (
    <section className="workflow-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Workflow</span>
          <h2 className="section-title">Streamlined Document Lifecycle</h2>
          <p className="section-subtitle">
            From initial upload to final archive, we've optimized every step
          </p>
        </div>
        
        <div className="workflow-steps">
          {steps.map((step, index) => (
            <div key={index} className="workflow-step">
              <div className="step-icon">{step.icon}</div>
              <div className="step-number">{index + 1}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
          <div className="workflow-connector"></div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;