import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaFileAlt, FaArrowLeft, FaDownload } from 'react-icons/fa';
import { useDocuments } from '../../hooks/useDocuments';
import './Documents.css';

const VersionCompare = () => {
  const { id } = useParams();
  const { getDocumentById, loading, error } = useDocuments();
  const [document, setDocument] = useState(null);
  const [version1, setVersion1] = useState(null);
  const [version2, setVersion2] = useState(null);
  const [differences, setDifferences] = useState([]);

  useEffect(() => {
    const fetchDocument = async () => {
      const doc = await getDocumentById(id);
      setDocument(doc);
      // Set default versions to compare (latest and previous)
      if (doc.versions.length >= 2) {
        setVersion1(doc.versions[0].number);
        setVersion2(doc.versions[1].number);
      }
    };
    fetchDocument();
  }, [id, getDocumentById]);

  // Mock function to find differences - in a real app, this would use a diffing library
  const compareVersions = () => {
    if (!version1 || !version2) return;
    
    // This is just sample data - real implementation would compare actual document content
    const mockDifferences = [
      { type: 'modified', section: 'Section 3.1', details: 'Updated requirements' },
      { type: 'added', section: 'Section 5.2', details: 'New safety guidelines added' },
      { type: 'deleted', section: 'Appendix A', details: 'Removed outdated references' },
    ];
    
    setDifferences(mockDifferences);
  };

  useEffect(() => {
    compareVersions();
  }, [version1, version2]);

  if (loading) return <div className="loading">Loading document...</div>;
  if (error) return <div className="error">Error loading document: {error}</div>;
  if (!document) return <div className="not-found">Document not found</div>;

  return (
    <div className="version-compare-container">
      <div className="version-header">
        <Link to={`/documents/${id}`} className="back-button">
          <FaArrowLeft /> Back to Document
        </Link>
        <h1>Compare Versions: {document.name}</h1>
      </div>

      <div className="version-selectors">
        <div className="version-selector">
          <label htmlFor="version1">Version 1:</label>
          <select
            id="version1"
            value={version1 || ''}
            onChange={(e) => setVersion1(e.target.value)}
          >
            {document.versions.map((v) => (
              <option key={v.number} value={v.number}>
                v{v.number} - {v.date} ({v.user})
              </option>
            ))}
          </select>
        </div>

        <div className="version-selector">
          <label htmlFor="version2">Version 2:</label>
          <select
            id="version2"
            value={version2 || ''}
            onChange={(e) => setVersion2(e.target.value)}
          >
            {document.versions.map((v) => (
              <option key={v.number} value={v.number}>
                v{v.number} - {v.date} ({v.user})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="version-previews">
        <div className="version-preview">
          <div className="preview-header">
            <h3>Version {version1}</h3>
            <button className="download-button">
              <FaDownload /> Download
            </button>
          </div>
          <div className="preview-content">
            <FaFileAlt className="file-icon" />
            <p>Preview of version {version1} content would appear here</p>
          </div>
        </div>

        <div className="version-preview">
          <div className="preview-header">
            <h3>Version {version2}</h3>
            <button className="download-button">
              <FaDownload /> Download
            </button>
          </div>
          <div className="preview-content">
            <FaFileAlt className="file-icon" />
            <p>Preview of version {version2} content would appear here</p>
          </div>
        </div>
      </div>

      <div className="version-differences">
        <h2>Differences</h2>
        {differences.length > 0 ? (
          <div className="differences-list">
            {differences.map((diff, index) => (
              <div key={index} className={`difference-item ${diff.type}`}>
                <span className="difference-type">{diff.type.toUpperCase()}</span>
                <span className="difference-section">{diff.section}</span>
                <p className="difference-details">{diff.details}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No differences found between these versions</p>
        )}
      </div>
    </div>
  );
};

export default VersionCompare;