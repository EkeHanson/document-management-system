// src/components/common/ProgressBar.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './ProjectCard.css';

const ProgressBar = ({ 
  percentage, 
  color = '#1890ff', 
  height = 8,
  showLabel = false,
  labelPosition = 'right',
  labelColor = '#000'
}) => {
  const containerStyles = {
    height: height,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: height,
    margin: '8px 0'
  }

  const fillerStyles = {
    height: '100%',
    width: `${percentage}%`,
    backgroundColor: color,
    borderRadius: 'inherit',
    transition: 'width 0.3s ease-in-out'
  }

  const labelStyles = {
    color: labelColor,
    fontSize: '0.875rem',
    marginLeft: labelPosition === 'right' ? '8px' : '0',
    marginRight: labelPosition === 'left' ? '8px' : '0'
  }

  return (
    <div className="progress-bar-container">
      {showLabel && labelPosition === 'left' && (
        <span style={labelStyles}>{percentage}%</span>
      )}
      
      <div style={containerStyles}>
        <div style={fillerStyles}></div>
      </div>
      
      {showLabel && labelPosition === 'right' && (
        <span style={labelStyles}>{percentage}%</span>
      )}
    </div>
  );
};

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
  color: PropTypes.string,
  height: PropTypes.number,
  showLabel: PropTypes.bool,
  labelPosition: PropTypes.oneOf(['left', 'right']),
  labelColor: PropTypes.string
};

export default ProgressBar;