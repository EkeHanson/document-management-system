import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { X } from 'react-feather';
import './Modal.css'; // Import your CSS file

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  closeOnOverlayClick = true 
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const sizeClasses = {
    sm: 'modal--sm',
    md: 'modal--md',
    lg: 'modal--lg',
    xl: 'modal--xl',
    full: 'modal--full'
  };

  return createPortal(
    <div className="modal__overlay" onClick={handleOverlayClick}>
      <div className={`modal ${sizeClasses[size]}`}>
        <div className="modal__header">
          <h3 className="modal__title">{title}</h3>
          <button 
            className="modal__close-button" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        <div className="modal__body">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'full']),
  closeOnOverlayClick: PropTypes.bool
};

export default Modal;