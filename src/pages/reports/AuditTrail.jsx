import React, { useState, useEffect } from 'react';
import { useAuditLogs } from '../../hooks/useAuditLogs';
import { Table, Select, DatePicker, Button, Tag, Input } from 'antd';
import { SearchOutlined, FilePdfOutlined } from '@ant-design/icons';
import './reports.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

const AuditTrailReport = () => {
  const { auditLogs, fetchAuditLogs } = useAuditLogs();
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState([]);
  const [actionFilter, setActionFilter] = useState(null);
  const [userFilter, setUserFilter] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  useEffect(() => {
    filterLogs();
  }, [auditLogs, dateRange, actionFilter, userFilter, searchText]);

  const filterLogs = () => {
    setLoading(true);
    let data = [...auditLogs];
    
    // Apply date range filter
    if (dateRange && dateRange.length === 2) {
      data = data.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate >= dateRange[0] && logDate <= dateRange[1];
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
    
    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      data = data.filter(log => 
        log.documentTitle?.toLowerCase().includes(searchLower) || 
        log.documentNumber?.toLowerCase().includes(searchLower) ||
        log.description?.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredLogs(data);
    setLoading(false);
  };

  const getActionColor = (action) => {
    switch(action) {
      case 'CREATE': return 'green';
      case 'UPDATE': return 'blue';
      case 'DELETE': return 'red';
      case 'DOWNLOAD': return 'orange';
      case 'LOGIN': return 'purple';
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
    },
    {
      title: 'User',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: action => <Tag color={getActionColor(action)}>{action}</Tag>,
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
    },
  ];

  const uniqueUsers = [...new Set(auditLogs.map(log => log.userId))];
  const uniqueActions = [...new Set(auditLogs.map(log => log.action))];

  const exportToPDF = () => {
    // Implementation for PDF export would go here
    console.log('Exporting audit trail to PDF...');
  };

  return (
    <div className="audit-trail-report">
      <div className="report-controls">
        <RangePicker 
          showTime 
          onChange={dates => setDateRange(dates)} 
          style={{ width: 350 }} 
        />
        
        <Select
          placeholder="Filter by Action"
          style={{ width: 150 }}
          onChange={setActionFilter}
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
          style={{ width: 250 }}
        />
        
        <Button 
          type="primary" 
          onClick={exportToPDF} 
          icon={<FilePdfOutlined />}
        >
          Export
        </Button>
      </div>
      
      <Table
        columns={columns}
        dataSource={filteredLogs}
        loading={loading}
        pagination={{ pageSize: 20 }}
        scroll={{ x: true }}
        rowKey="_id"
      />
    </div>
  );
};

export default AuditTrailReport;