import { useState, useEffect } from 'react';
import api from '../services/api';

const useDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const response = await api.get('/documents');
        setDocuments(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch documents:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // Function to add a new document
  const addDocument = async (newDocument) => {
    try {
      const response = await api.post('/documents', newDocument);
      setDocuments(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      console.error('Failed to add document:', err);
      throw err;
    }
  };

  // Function to update a document
  const updateDocument = async (id, updatedData) => {
    try {
      const response = await api.put(`/documents/${id}`, updatedData);
      setDocuments(prev => 
        prev.map(doc => doc.id === id ? response.data : doc)
      );
      return response.data;
    } catch (err) {
      console.error('Failed to update document:', err);
      throw err;
    }
  };

  // Function to delete a document
  const deleteDocument = async (id) => {
    try {
      await api.delete(`/documents/${id}`);
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    } catch (err) {
      console.error('Failed to delete document:', err);
      throw err;
    }
  };

  return {
    documents,
    loading,
    error,
    addDocument,
    updateDocument,
    deleteDocument
  };
};

// Make sure to use named export
export { useDocuments };