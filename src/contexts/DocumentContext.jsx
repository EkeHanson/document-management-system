// src/contexts/DocumentContext.js
import React, { createContext, useState, useContext } from 'react';

const DocumentContext = createContext();

export const DocumentProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDocuments = async (projectId) => {
    setLoading(true);
    try {
      // Replace with actual API call
      const response = await fetch(`/api/projects/${projectId}/documents`);
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipients = async (projectId) => {
    setLoading(true);
    try {
      // Replace with actual API call
      const response = await fetch(`/api/projects/${projectId}/recipients`);
      const data = await response.json();
      setRecipients(data);
    } catch (error) {
      console.error('Error fetching recipients:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTransmittal = async (transmittalData) => {
    setLoading(true);
    try {
      // Replace with actual API call
      const response = await fetch('/api/transmittals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transmittalData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating transmittal:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <DocumentContext.Provider
      value={{
        documents,
        recipients,
        loading,
        fetchDocuments,
        fetchRecipients,
        createTransmittal,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocumentContext must be used within a DocumentProvider');
  }
  return context;
};