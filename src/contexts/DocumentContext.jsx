// src/contexts/DocumentContext.jsx
import { createContext, useContext, useState } from 'react';

const DocumentContext = createContext();

export function DocumentProvider({ children }) {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  
  // Add all your document-related state and functions here
  const value = {
    documents,
    setDocuments,
    selectedDocument,
    setSelectedDocument,
    // other document-related functions...
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
}

// This is the named export that DrawingList.jsx is looking for
export function useDocumentContext() {
  return useContext(DocumentContext);
}

// Also export the context directly if needed
export { DocumentContext };