// src/pages/documents/DocumentList.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaFileAlt } from 'react-icons/fa';
import { dummyDocuments } from '../../utils/dummyData';
import './Documents.css';

const DocumentList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all'
  });

  const filteredDocuments = dummyDocuments.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (doc.description && doc.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filters.status === 'all' || doc.status === filters.status;
    const matchesType = filters.type === 'all' || doc.type === filters.type;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

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
              <option value="Draft">Draft</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
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
                <span className={`file-type ${doc.type}`}>
                  {doc.type.toUpperCase()}
                </span>
              </div>
              <div className="table-cell">
                <span className={`status-badge ${doc.status.toLowerCase().replace(' ', '-')}`}>
                  {doc.status}
                </span>
              </div>
              <div className="table-cell">
                {new Date(doc.modifiedAt).toLocaleDateString()}
              </div>
              <div className="table-cell">
                v{doc.version}
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