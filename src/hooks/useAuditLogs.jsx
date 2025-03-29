import { useState, useEffect, useCallback } from 'react';
import { getAuditLogs } from '../services/auditService';

export const useAuditLogs = (params = {}) => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

// In your useAuditLogs hook
const fetchAuditLogs = async (params = {}) => {
  try {
    setLoading(true);
    const response = await api.get('/audit-logs', { params });
    
    // Check if response is HTML (error page)
    if (typeof response.data === 'string' && response.data.startsWith('<!')) {
      throw new Error('Server returned an error page');
    }
    
    // Process your data as normal
    setAuditLogs(response.data.data);
    setPagination({
      ...params.pagination,
      total: response.data.total,
    });
  } catch (error) {
    let errorMessage = 'Failed to fetch audit logs';
    
    // Handle different error types
    if (error.response) {
      if (typeof error.response.data === 'string' && error.response.data.startsWith('<!')) {
        errorMessage = 'Server error occurred (unexpected response)';
      } else {
        errorMessage = error.response.data.message || errorMessage;
      }
    } else if (error.request) {
      errorMessage = 'No response from server';
    }
    
    setError(errorMessage);
    console.error('Error fetching audit logs:', error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchAuditLogs();
  }, [fetchAuditLogs]);

  const handleTableChange = (newPagination) => {
    setPagination(prev => ({
      ...prev,
      ...newPagination,
    }));
  };

  return {
    auditLogs,
    loading,
    error,
    pagination,
    handleTableChange,
    fetchAuditLogs, // Exposing the function as fetchAuditLogs
  };
};