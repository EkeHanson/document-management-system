// src/components/documents/VersionHistory.jsx
import React from 'react';
import { FaDownload, FaHistory } from 'react-icons/fa';

const VersionHistory = ({ versions }) => {
  return (
    <div className="version-history">
      <h3>Version History</h3>
      <div className="history-table">
        {versions.map((version) => (
          <div key={version.number} className="version-row">
            <div className="version-number">v{version.number}</div>
            <div className="version-date">{new Date(version.date).toLocaleString()}</div>
            <div className="version-user">{version.user}</div>
            <div className="version-actions">
              <button className="action-button">
                <FaDownload /> Download
              </button>
              <button className="action-button">
                <FaHistory /> Compare
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VersionHistory;