// src/components/common/Avatar.jsx
import React from 'react';
import PropTypes from 'prop-types';
// import './Avatar.css'; // Basic styling

const Avatar = ({ src, name, size = 'medium', ...props }) => {
  const initials = name 
    ? name.split(' ').map(part => part[0]).join('').toUpperCase()
    : '';

  const sizeClasses = {
    small: 'w-8 h-8 text-xs',
    medium: 'w-10 h-10 text-sm',
    large: 'w-12 h-12 text-base'
  };

  return (
    <div 
      className={`avatar ${sizeClasses[size]} flex items-center justify-center rounded-full bg-gray-200 overflow-hidden`}
      {...props}
    >
      {src ? (
        <img 
          src={src} 
          alt={name || 'User avatar'} 
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-gray-600 font-medium">{initials}</span>
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default Avatar;