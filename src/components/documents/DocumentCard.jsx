import React from 'react';
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileImage, FaFileAlt } from 'react-icons/fa';
import { MdEdit, MdDelete, MdDownload } from 'react-icons/md';
import './DocumentCard.css';

const DocumentCard = ({ document, showStatus = false }) => {
  const {
    id,
    title,
    description,
    type,
    status,
    version,
    lastModified,
    owner
  } = document;

  const getFileIcon = () => {
    switch (type.toLowerCase()) {
      case 'pdf': return <FaFilePdf className="file-icon pdf" />;
      case 'doc':
      case 'docx': return <FaFileWord className="file-icon word" />;
      case 'xls':
      case 'xlsx': return <FaFileExcel className="file-icon excel" />;
      case 'jpg':
      case 'png': return <FaFileImage className="file-icon image" />;
      default: return <FaFileAlt className="file-icon generic" />;
    }
  };

  const getStatusBadge = () => {
    if (!showStatus) return null;
    
    let statusClass = '';
    switch (status.toLowerCase()) {
      case 'approved': statusClass = 'approved'; break;
      case 'pending': statusClass = 'pending'; break;
      case 'rejected': statusClass = 'rejected'; break;
      case 'draft': statusClass = 'draft'; break;
      default: statusClass = 'default';
    }

    return (
      <span className={`status-badge ${statusClass}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="document-card">
      <div className="document-header">
        <div className="file-type-icon">
          {getFileIcon()}
        </div>
        <div className="document-title-wrapper">
          <h3 className="document-title">{title}</h3>
          {getStatusBadge()}
        </div>
      </div>
      
      <p className="document-description">{description}</p>
      
      <div className="document-meta">
        <div className="meta-item">
          <span className="meta-label">Version:</span>
          <span className="meta-value">v{version}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Modified:</span>
          <span className="meta-value">
            {new Date(lastModified).toLocaleDateString()}
          </span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Owner:</span>
          <span className="meta-value">{owner}</span>
        </div>
      </div>

      <div className="document-actions">
        <button className="action-button download-button">
          <MdDownload /> Download
        </button>
        <button className="action-button edit-button">
          <MdEdit /> Edit
        </button>
        <button className="action-button delete-button">
          <MdDelete /> Delete
        </button>
      </div>
    </div>
  );
};

export default DocumentCard; // This is the crucial default export