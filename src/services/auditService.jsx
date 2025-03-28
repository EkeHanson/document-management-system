import api from './api';

export const getAuditLogs = async (params = {}) => {
  try {
    const response = await api.get('/audit-logs', { params });
    return {
      data: response.data.data,
      total: response.data.total,
    };
  } catch (error) {
    throw error;
  }
};