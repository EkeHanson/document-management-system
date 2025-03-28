import { useState, useEffect } from 'react';
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

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      const response = await getAuditLogs({
        ...params,
        page: pagination.current,
        pageSize: pagination.pageSize,
      });
      setAuditLogs(response.data);
      setPagination({
        ...pagination,
        total: response.total,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, [params, pagination.current, pagination.pageSize]);

  const handleTableChange = (newPagination) => {
    setPagination({
      ...pagination,
      ...newPagination,
    });
  };

  return {
    auditLogs,
    loading,
    error,
    pagination,
    handleTableChange,
    refresh: fetchAuditLogs,
  };
};