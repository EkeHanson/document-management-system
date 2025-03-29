export const getAuditLogs = async (params = {}) => {
  try {
    const queryString = new URLSearchParams();
    
    // Add all parameters to the query string
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryString.append(key, value);
      }
    });
    
    const response = await fetch(`/api/audit-logs?${queryString}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return {
      data: data.items || data,
      total: data.totalCount || data.length,
    };
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    throw error;
  }
};