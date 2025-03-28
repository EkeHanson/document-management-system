import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaFileAlt, FaDownload, FaHistory, FaEdit } from 'react-icons/fa';
import { useDocuments } from '../../hooks/useDocuments';
import './Documents.css';

const DocumentList = () => {
  const { documents, loading, error } = useDocuments();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    dateRange: 'all'
  });

  const filteredDocuments = documents.filter(doc => {
    // Search filter
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = filters.status === 'all' || doc.status === filters.status;
    
    // Type filter
    const matchesType = filters.type === 'all' || doc.type === filters.type;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="loading">Loading documents...</div>;
  if (error) return <div className="error">Error loading documents: {error}</div>;

  return (
    <div className="document-list-container">
      <div className="document-list-header">
        <h1>Document Management</h1>
        <Link to="/documents/upload" className="upload-button">
          Upload New Document
        </Link>
      </div>

      <div className="document-controls">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <FaFilter className="filter-icon" />
            <select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending Approval</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="filter-group">
            <FaFilter className="filter-icon" />
            <select name="type" value={filters.type} onChange={handleFilterChange}>
              <option value="all">All Types</option>
              <option value="pdf">PDF</option>
              <option value="docx">Word</option>
              <option value="xlsx">Excel</option>
              <option value="dwg">AutoCAD</option>
            </select>
          </div>
        </div>
      </div>

      <div className="document-table">
        <div className="table-header">
          <div className="header-cell">Name</div>
          <div className="header-cell">Type</div>
          <div className="header-cell">Status</div>
          <div className="header-cell">Last Modified</div>
          <div className="header-cell">Version</div>
          <div className="header-cell actions">Actions</div>
        </div>

        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc) => (
            <div key={doc.id} className="table-row">
              <div className="table-cell">
                <FaFileAlt className="file-icon" />
                <Link to={`/documents/${doc.id}`} className="document-name">
                  {doc.name}
                </Link>
              </div>
              <div className="table-cell">
                <span className={`file-type ${doc.type}`}>{doc.type.toUpperCase()}</span>
              </div>
              <div className="table-cell">
                <span className={`status-badge ${doc.status}`}>{doc.status}</span>
              </div>
              <div className="table-cell">{doc.modifiedDate}</div>
              <div className="table-cell">v{doc.version}</div>
              <div className="table-cell actions">
                <Link to={`/documents/${doc.id}/download`} className="action-button download">
                  <FaDownload />
                </Link>
                <Link to={`/documents/${doc.id}/history`} className="action-button history">
                  <FaHistory />
                </Link>
                <Link to={`/documents/${doc.id}/edit`} className="action-button edit">
                  <FaEdit />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="no-documents">
            No documents found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentList;