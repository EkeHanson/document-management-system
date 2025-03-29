// src/contexts/DocumentContext.js
import React, { createContext, useState, useContext, useCallback } from 'react';
import { message } from 'antd';

// Create context
const DocumentContext = createContext();

// Provider component
export const DocumentProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [drawings, setDrawings] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentDocument, setCurrentDocument] = useState(null);

  // Fetch all drawings for a project
  const fetchDrawings = useCallback(async (projectId) => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual fetch
      // const response = await fetch(`/api/projects/${projectId}/drawings`);
      // const data = await response.json();
      
      // Mock response for demonstration
      const mockDrawings = [
        {
          id: '1',
          drawingNumber: 'ARC-001',
          title: 'Floor Plan - Level 1',
          discipline: 'Architectural',
          revision: 'A',
          status: 'Approved',
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          drawingNumber: 'STR-001',
          title: 'Foundation Details',
          discipline: 'Structural',
          revision: 'B',
          status: 'For Review',
          updatedAt: new Date().toISOString(),
        },
      ];
      
      setDrawings(mockDrawings);
      setError(null);
    } catch (err) {
      setError(err);
      message.error('Failed to fetch drawings');
      console.error('Error fetching drawings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch all documents for a project
  const fetchDocuments = useCallback(async (projectId) => {
    setLoading(true);
    try {
      // Replace with actual API call
      const response = await fetch(`/api/projects/${projectId}/documents`);
      const data = await response.json();
      setDocuments(data);
      setError(null);
    } catch (err) {
      setError(err);
      message.error('Failed to fetch documents');
      console.error('Error fetching documents:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch recipients for a project
  const fetchRecipients = useCallback(async (projectId) => {
    setLoading(true);
    try {
      // Replace with actual API call
      const response = await fetch(`/api/projects/${projectId}/recipients`);
      const data = await response.json();
      setRecipients(data);
      setError(null);
    } catch (err) {
      setError(err);
      message.error('Failed to fetch recipients');
      console.error('Error fetching recipients:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new transmittal
  const createTransmittal = useCallback(async (transmittalData) => {
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
      message.success('Transmittal created successfully');
      return data;
    } catch (err) {
      setError(err);
      message.error('Failed to create transmittal');
      console.error('Error creating transmittal:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get a single drawing by ID
  const getDrawingById = useCallback((drawingId) => {
    return drawings.find(drawing => drawing.id === drawingId);
  }, [drawings]);

  // Add a new drawing
  const addDrawing = useCallback(async (newDrawing) => {
    setLoading(true);
    try {
      // Replace with actual API call
      // const response = await fetch('/api/drawings', {
      //   method: 'POST',
      //   body: JSON.stringify(newDrawing)
      // });
      // const data = await response.json();
      
      // Mock implementation
      const data = {
        ...newDrawing,
        id: Math.random().toString(36).substr(2, 9),
        updatedAt: new Date().toISOString(),
      };
      
      setDrawings(prev => [...prev, data]);
      message.success('Drawing added successfully');
      return data;
    } catch (err) {
      setError(err);
      message.error('Failed to add drawing');
      console.error('Error adding drawing:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update an existing drawing
  const updateDrawing = useCallback(async (drawingId, updatedData) => {
    setLoading(true);
    try {
      // Replace with actual API call
      // const response = await fetch(`/api/drawings/${drawingId}`, {
      //   method: 'PUT',
      //   body: JSON.stringify(updatedData)
      // });
      // const data = await response.json();
      
      // Mock implementation
      setDrawings(prev => prev.map(drawing => 
        drawing.id === drawingId ? { ...drawing, ...updatedData } : drawing
      ));
      message.success('Drawing updated successfully');
      return { ...updatedData, id: drawingId };
    } catch (err) {
      setError(err);
      message.error('Failed to update drawing');
      console.error('Error updating drawing:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete a drawing
  const deleteDrawing = useCallback(async (drawingId) => {
    setLoading(true);
    try {
      // Replace with actual API call
      // await fetch(`/api/drawings/${drawingId}`, { method: 'DELETE' });
      
      // Mock implementation
      setDrawings(prev => prev.filter(drawing => drawing.id !== drawingId));
      message.success('Drawing deleted successfully');
    } catch (err) {
      setError(err);
      message.error('Failed to delete drawing');
      console.error('Error deleting drawing:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Set current document for viewing/editing
  const setDocument = useCallback((document) => {
    setCurrentDocument(document);
  }, []);

  // Clear current document
  const clearCurrentDocument = useCallback(() => {
    setCurrentDocument(null);
  }, []);

  // Context value
  const value = {
    documents,
    drawings,
    recipients,
    loading,
    error,
    currentDocument,
    fetchDocuments,
    fetchDrawings,
    fetchRecipients,
    createTransmittal,
    getDrawingById,
    addDrawing,
    updateDrawing,
    deleteDrawing,
    setDocument,
    clearCurrentDocument,
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};

// Custom hook for using the document context
export const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocumentContext must be used within a DocumentProvider');
  }
  return context;
};

// Default export
export default DocumentContext;