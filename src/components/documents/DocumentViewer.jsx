// src/components/documents/DocumentViewer.jsx
import React from 'react';

const DocumentViewer = ({ fileUrl, fileType }) => {
  return (
    <div className="document-viewer">
      {fileType === 'pdf' ? (
        <iframe 
          src={fileUrl} 
          title="Document Viewer"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        />
      ) : fileType === 'dwg' ? (
        <div className="dwg-viewer">
          <p>AutoCAD file preview would be displayed here in a real application</p>
          <p>File: {fileUrl}</p>
        </div>
      ) : (
        <div className="unsupported-format">
          <p>Preview not available for {fileType} files.</p>
          <a href={fileUrl} download>Download file</a>
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;