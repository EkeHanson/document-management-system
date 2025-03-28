import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaDownload, FaHistory, FaEdit, FaArrowLeft, FaComment, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { useDocuments } from '../../hooks/useDocuments';
import './Documents.css';

const DocumentDetail = () => {
  const { id } = useParams();
  const { getDocumentById, loading, error } = useDocuments();
  const [document, setDocument] = useState(null);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const fetchDocument = async () => {
      const doc = await getDocumentById(id);
      setDocument(doc);
    };
    fetchDocument();
  }, [id, getDocumentById]);

  if (loading) return <div className="loading">Loading document...</div>;
  if (error) return <div className="error">Error loading document: {error}</div>;
  if (!document) return <div className="not-found">Document not found</div>;

  return (
    <div className="document-detail-container">
      <div className="document-header">
        <Link to="/documents" className="back-button">
          <FaArrowLeft /> Back to Documents
        </Link>
        <h1>{document.name}</h1>
        <div className="document-actions">
          <button className="action-button download">
            <FaDownload /> Download
          </button>
          <button className="action-button edit">
            <FaEdit /> Edit
          </button>
        </div>
      </div>

      <div className="document-tabs">
        <button
          className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          Details
        </button>
        <button
          className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Version History
        </button>
        <button
          className={`tab-button ${activeTab === 'comments' ? 'active' : ''}`}
          onClick={() => setActiveTab('comments')}
        >
          Comments
        </button>
      </div>

      {activeTab === 'details' && (
        <div className="document-details">
          <div className="detail-row">
            <span className="detail-label">Document ID:</span>
            <span className="detail-value">{document.id}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Type:</span>
            <span className="detail-value">{document.type}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Status:</span>
            <span className={`detail-value status-badge ${document.status}`}>
              {document.status}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Current Version:</span>
            <span className="detail-value">v{document.version}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Uploaded By:</span>
            <span className="detail-value">
              <FaUser /> {document.uploadedBy}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Upload Date:</span>
            <span className="detail-value">
              <FaCalendarAlt /> {document.uploadDate}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Last Modified:</span>
            <span className="detail-value">
              <FaCalendarAlt /> {document.modifiedDate}
            </span>
          </div>
          <div className="detail-row full-width">
            <span className="detail-label">Description:</span>
            <p className="detail-value">{document.description}</p>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="version-history">
          <h3>Version History</h3>
          <div className="history-table">
            {document.versions.map((version) => (
              <div key={version.number} className="version-row">
                <div className="version-number">v{version.number}</div>
                <div className="version-date">{version.date}</div>
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
      )}

      {activeTab === 'comments' && (
        <div className="document-comments">
          <div className="comment-form">
            <textarea placeholder="Add your comment..." rows="3"></textarea>
            <button className="submit-button">Post Comment</button>
          </div>
          <div className="comments-list">
            {document.comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <span className="comment-user">
                    <FaUser /> {comment.user}
                  </span>
                  <span className="comment-date">
                    <FaCalendarAlt /> {comment.date}
                  </span>
                </div>
                <div className="comment-content">{comment.text}</div>
                {comment.replies && comment.replies.length > 0 && (
                  <div className="comment-replies">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="reply-item">
                        <div className="reply-header">
                          <span className="reply-user">
                            <FaUser /> {reply.user}
                          </span>
                          <span className="reply-date">
                            <FaCalendarAlt /> {reply.date}
                          </span>
                        </div>
                        <div className="reply-content">{reply.text}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentDetail;