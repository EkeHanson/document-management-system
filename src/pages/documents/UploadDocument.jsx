import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaTimes, FaFileAlt, FaInfoCircle } from 'react-icons/fa';
import './Documents.css';

const UploadDocument = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [documentData, setDocumentData] = useState({
    name: '',
    description: '',
    project: '',
    category: '',
    notifyUsers: false
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Auto-fill name if empty
      if (!documentData.name) {
        const fileName = selectedFile.name.split('.').slice(0, -1).join('.');
        setDocumentData(prev => ({ ...prev, name: fileName }));
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDocumentData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would handle the file upload and document creation/update
    // This is just a mock implementation
    console.log('Submitting:', { file, documentData });
    navigate('/documents');
  };

  return (
    <div className="upload-document-container">
      <h1>{isUpdating ? 'Update Document' : 'Upload New Document'}</h1>
      
      <form onSubmit={handleSubmit} className="document-form">
        <div className="form-section">
          <h2>Document Information</h2>
          <div className="form-group">
            <label htmlFor="name">Document Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={documentData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={documentData.description}
              onChange={handleInputChange}
              rows="3"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="project">Project*</label>
              <select
                id="project"
                name="project"
                value={documentData.project}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Project</option>
                <option value="project1">Project Alpha</option>
                <option value="project2">Project Beta</option>
                <option value="project3">Project Gamma</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="category">Category*</label>
              <select
                id="category"
                name="category"
                value={documentData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                <option value="design">Design</option>
                <option value="specification">Specification</option>
                <option value="report">Report</option>
                <option value="contract">Contract</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>File Upload</h2>
          <div className="file-upload-area">
            {file ? (
              <div className="file-preview">
                <FaFileAlt className="file-icon" />
                <div className="file-info">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <button
                  type="button"
                  className="remove-file"
                  onClick={() => setFile(null)}
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <div className="upload-prompt">
                <label htmlFor="file-upload" className="upload-label">
                  <FaUpload className="upload-icon" />
                  <span>Choose a file or drag it here</span>
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    hidden
                  />
                </label>
                <p className="upload-hint">
                  Supported formats: PDF, DOCX, XLSX, DWG (Max 50MB)
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="notifyUsers"
              name="notifyUsers"
              checked={documentData.notifyUsers}
              onChange={handleInputChange}
            />
            <label htmlFor="notifyUsers">
              Notify relevant users about this {isUpdating ? 'update' : 'upload'}
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate('/documents')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={!file || !documentData.name}
          >
            {isUpdating ? 'Update Document' : 'Upload Document'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadDocument;