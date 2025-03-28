// src/components/projects/ProjectCard.jsx
import React from 'react';
import { FaCalendarAlt, FaUsers, FaFileAlt, FaCheckCircle } from 'react-icons/fa';
import { Progress } from 'antd';
import './ProjectCard.css';

const ProjectCard = ({ project, showProgress = false }) => {
  const {
    id,
    name,
    description,
    status,
    startDate,
    endDate,
    documentCount,
    teamMembers,
    progress
  } = project;

  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'active': return 'var(--color-primary)';
      case 'completed': return 'var(--color-success)';
      case 'on hold': return 'var(--color-warning)';
      case 'cancelled': return 'var(--color-danger)';
      default: return 'var(--color-text)';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="project-card">
      <div className="project-header">
        <h3 className="project-name">{name}</h3>
        <span className="project-status" style={{ backgroundColor: getStatusColor() }}>
          {status}
        </span>
      </div>
      
      <p className="project-description">{description}</p>
      
      <div className="project-meta">
        <div className="meta-item">
          <FaCalendarAlt className="meta-icon" />
          <span>{formatDate(startDate)} - {formatDate(endDate)}</span>
        </div>
        
        <div className="meta-item">
          <FaFileAlt className="meta-icon" />
          <span>{documentCount} documents</span>
        </div>
        
        <div className="meta-item">
          <FaUsers className="meta-icon" />
          <span>{teamMembers} members</span>
        </div>
      </div>

      {showProgress && (
        <div className="project-progress">
          <Progress 
            percent={progress} 
            strokeColor={getStatusColor()}
            showInfo={false}
          />
          <div className="progress-label">
            <span>Progress:</span>
            <span>{progress}%</span>
          </div>
        </div>
      )}

      <div className="project-actions">
        <button className="action-button view-button">View Project</button>
        {status.toLowerCase() !== 'completed' && (
          <button className="action-button complete-button">
            <FaCheckCircle /> Mark Complete
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;