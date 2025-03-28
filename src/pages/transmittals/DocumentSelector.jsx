import React, { useState, useEffect } from 'react';
import { 
  Input, 
  Button, 
  Checkbox, 
  Spin,
  Card,
  Typography,
  Space,
  Alert
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDocumentContext } from '../../contexts/DocumentContext';
import './DocumentSelector.css'; // Changed to regular CSS import

const { Text } = Typography;
const { Search } = Input;

const DocumentSelector = ({ onSelectionComplete }) => {
  const { documents, loading, error, fetchDocuments } = useDocumentContext();
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    if (documents) {
      const filtered = documents.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.revision.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDocuments(filtered);
    }
  }, [searchTerm, documents]);

  const toggleDocumentSelection = (docId) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId) 
        : [...prev, docId]
    );
  };

  const handleSubmit = () => {
    const selectedDocs = documents.filter(doc => selectedDocuments.includes(doc.id));
    onSelectionComplete(selectedDocs);
  };

  if (loading) return <Spin size="large" className="spinner" />;
  if (error) return <Alert message="Error loading documents" description={error.message} type="error" showIcon />;

  return (
    <div className="document-selector">
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div className="search-bar">
          <Search
            placeholder="Search documents..."
            allowClear
            enterButton={<Button type="primary"><SearchOutlined /> Search</Button>}
            size="large"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Button 
            type="primary"
            onClick={handleSubmit}
            disabled={selectedDocuments.length === 0}
            size="large"
          >
            Add Selected ({selectedDocuments.length})
          </Button>
        </div>

        <div className="document-list">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map(document => (
              <Card 
                key={document.id} 
                className={`document-item ${selectedDocuments.includes(document.id) ? 'selected' : ''}`}
                hoverable
                onClick={() => toggleDocumentSelection(document.id)}
              >
                <Space align="start">
                  <Checkbox
                    checked={selectedDocuments.includes(document.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleDocumentSelection(document.id);
                    }}
                  />
                  <div>
                    <Text strong>{document.title}</Text>
                    <br />
                    <Text type="secondary">Document #: {document.documentNumber}</Text>
                    <br />
                    <Text type="secondary">Revision: {document.revision}</Text>
                  </div>
                </Space>
              </Card>
            ))
          ) : (
            <Card>
              <Text type="secondary">
                {searchTerm ? 'No documents match your search' : 'No documents available'}
              </Text>
            </Card>
          )}
        </div>
      </Space>
    </div>
  );
};

export default DocumentSelector;