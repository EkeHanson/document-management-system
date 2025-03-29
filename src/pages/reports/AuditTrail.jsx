import React, { useState, useEffect } from 'react';
import { useAuditLogs } from '../../hooks/useAuditLogs';
import { Table, Select, DatePicker, Button, Tag, Input, Space, Alert } from 'antd';
import { SearchOutlined, FilePdfOutlined, ReloadOutlined } from '@ant-design/icons';
import './reports.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '24px' }}>
          <Alert
            message="Component Error"
            description={
              <div>
                <p>Something went wrong displaying the audit trail.</p>
                <Button 
                  type="primary" 
                  onClick={() => window.location.reload()}
                  style={{ marginTop: '8px' }}
                >
                  Refresh Page
                </Button>
              </div>
            }
            type="error"
            showIcon
          />
        </div>
      );
    }

    return this.props.children;
  }
}

const AuditTrailReport = () => {
  const { 
    auditLogs, 
    loading, 
    error, 
    pagination, 
    handleTableChange, 
    fetchAuditLogs 
  } = useAuditLogs();
  
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [actionFilter, setActionFilter] = useState(null);
  const [userFilter, setUserFilter] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    filterLogs();
  }, [auditLogs, dateRange, actionFilter, userFilter, searchText]);

  const filterLogs = () => {
    let data = [...auditLogs];
    
    // Apply date range filter
    if (dateRange && dateRange.length === 2) {
      const [startDate, endDate] = dateRange;
      data = data.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate >= startDate && logDate <= endDate;
      });
    }
    
    // Apply action filter
    if (actionFilter) {
      data = data.filter(log => log.action === actionFilter);
    }
    
    // Apply user filter
    if (userFilter) {
      data = data.filter(log => log.userId === userFilter);
    }
    
      // Corrected search filter condition
      if (searchText) {
        const searchLower = searchText.toLowerCase();
        data = data.filter(log => 
          log.documentTitle?.toLowerCase().includes(searchLower) || 
          log.documentNumber?.toLowerCase().includes(searchLower) ||
          log.description?.toLowerCase().includes(searchLower) ||
          log.userName?.toLowerCase().includes(searchLower)
        );
      }
    
    setFilteredLogs(data);
  };

  const getActionColor = (action) => {
    switch(action) {
      case 'CREATE': return 'green';
      case 'UPDATE': return 'blue';
      case 'DELETE': return 'red';
      case 'DOWNLOAD': return 'orange';
      case 'LOGIN': return 'purple';
      case 'LOGOUT': return 'volcano';
      default: return 'gray';
    }
  };

  const columns = [
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: date => new Date(date).toLocaleString(),
      sorter: (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
      width: 180,
    },
    {
      title: 'User',
      dataIndex: 'userName',
      key: 'userName',
      width: 150,
      sorter: (a, b) => a.userName?.localeCompare(b.userName),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: action => <Tag color={getActionColor(action)}>{action}</Tag>,
      width: 120,
      filters: [...new Set(auditLogs.map(log => log.action))].map(action => ({
        text: action,
        value: action,
      })),
      onFilter: (value, record) => record.action === value,
    },
    {
      title: 'Document',
      dataIndex: 'documentTitle',
      key: 'documentTitle',
      render: (text, record) => (
        <span>
          {record.documentNumber && <strong>{record.documentNumber}</strong>}
          {text && ` - ${text}`}
        </span>
      ),
      ellipsis: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'IP Address',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
      width: 120,
    },
  ];

  const uniqueUsers = [...new Set(auditLogs.map(log => log.userId))];
  const uniqueActions = [...new Set(auditLogs.map(log => log.action))];

  const exportToPDF = () => {
    try {
      // Implementation for PDF export would go here
      console.log('Exporting filtered audit trail to PDF...', filteredLogs);
      // In a real implementation, you would call your PDF generation API here
    } catch (err) {
      console.error('Failed to export to PDF:', err);
    }
  };

  const handleResetFilters = () => {
    setDateRange([]);
    setActionFilter(null);
    setUserFilter(null);
    setSearchText('');
  };

  return (
    <div className="audit-trail-report">
      <div className="report-controls">
        <Space size="middle" wrap>
          <RangePicker 
            showTime 
            onChange={setDateRange} 
            value={dateRange}
            style={{ width: 350 }} 
          />
          
          <Select
            placeholder="Filter by Action"
            style={{ width: 150 }}
            onChange={setActionFilter}
            value={actionFilter}
            allowClear
          >
            {uniqueActions.map(action => (
              <Option key={action} value={action}>{action}</Option>
            ))}
          </Select>
          
          <Select
            placeholder="Filter by User"
            style={{ width: 200 }}
            onChange={setUserFilter}
            value={userFilter}
            allowClear
          >
            {uniqueUsers.map(userId => {
              const user = auditLogs.find(log => log.userId === userId);
              return (
                <Option key={userId} value={userId}>
                  {user?.userName || userId}
                </Option>
              );
            })}
          </Select>
          
          <Input
            placeholder="Search in audit trail..."
            prefix={<SearchOutlined />}
            onChange={e => setSearchText(e.target.value)}
            value={searchText}
            style={{ width: 250 }}
            allowClear
          />
          
          <Button 
            icon={<ReloadOutlined />}
            onClick={fetchAuditLogs}
            loading={loading}
          >
            Refresh
          </Button>
          
          <Button 
            onClick={handleResetFilters}
            disabled={!dateRange.length && !actionFilter && !userFilter && !searchText}
          >
            Clear Filters
          </Button>
          
          <Button 
            type="primary" 
            onClick={exportToPDF} 
            icon={<FilePdfOutlined />}
            disabled={filteredLogs.length === 0}
          >
            Export PDF
          </Button>
        </Space>
      </div>
      
      {error ? (
        <Alert 
          message="Error Loading Audit Trail" 
          description={
            <div>
              <p>We encountered an issue loading the audit trail.</p>
              {error.includes('unexpected response') ? (
                <p>The server returned an unexpected response. This might be a temporary issue.</p>
              ) : (
                <p>{error}</p>
              )}
              <Button 
                type="link" 
                onClick={fetchAuditLogs}
                loading={loading}
                size="small"
                style={{ paddingLeft: 0 }}
              >
                Try Again
              </Button>
            </div>
          }
          type="error" 
          showIcon 
          closable 
          style={{ marginBottom: 16 }}
        />
      ) : null}
      
      {!loading && !error && filteredLogs.length === 0 ? (
        <Alert
          message="No audit logs found"
          description="Try adjusting your filters or refresh the data"
          type="info"
          showIcon
          action={
            <Button size="small" onClick={fetchAuditLogs} icon={<ReloadOutlined />}>
              Refresh Data
            </Button>
          }
          style={{ marginBottom: 16 }}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={filteredLogs}
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          onChange={handleTableChange}
          scroll={{ x: true }}
          rowKey="_id"
          bordered
          size="middle"
        />
      )}
    </div>
  );
};

const WrappedAuditTrailReport = () => (
  <ErrorBoundary>
    <AuditTrailReport />
  </ErrorBoundary>
);

export default WrappedAuditTrailReport;