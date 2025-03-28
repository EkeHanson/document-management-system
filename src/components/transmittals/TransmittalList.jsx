import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFileAlt, FaRegClock, FaCheckCircle, FaTimesCircle, FaPlus } from 'react-icons/fa';
import { Table, Tag, Button, Input, Space, Tooltip } from 'antd';
import { formatDate } from '../../utils/dateUtils';
import './TransmittalList.css';

const TransmittalList = ({ transmittals, loading }) => {
  const [filteredTransmittals, setFilteredTransmittals] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredTransmittals(transmittals);
  }, [transmittals]);

  const handleSearch = (value) => {
    setSearchText(value);
    if (!value) {
      setFilteredTransmittals(transmittals);
      return;
    }
    const filtered = transmittals.filter(transmittal =>
      transmittal.referenceNumber.toLowerCase().includes(value.toLowerCase()) ||
      transmittal.subject.toLowerCase().includes(value.toLowerCase()) ||
      transmittal.recipient.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTransmittals(filtered);
  };

  const getStatusTag = (status) => {
    let color, icon;
    switch (status.toLowerCase()) {
      case 'sent':
        color = 'blue';
        icon = <FaFileAlt />;
        break;
      case 'pending':
        color = 'orange';
        icon = <FaRegClock />;
        break;
      case 'received':
        color = 'green';
        icon = <FaCheckCircle />;
        break;
      case 'rejected':
        color = 'red';
        icon = <FaTimesCircle />;
        break;
      default:
        color = 'gray';
    }
    return (
      <Tag color={color} icon={icon}>
        {status.toUpperCase()}
      </Tag>
    );
  };

  const columns = [
    {
      title: 'Reference #',
      dataIndex: 'referenceNumber',
      key: 'referenceNumber',
      sorter: (a, b) => a.referenceNumber.localeCompare(b.referenceNumber),
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      ellipsis: true,
    },
    {
      title: 'Recipient',
      dataIndex: 'recipient',
      key: 'recipient',
    },
    {
      title: 'Date Sent',
      dataIndex: 'dateSent',
      key: 'dateSent',
      render: (date) => formatDate(date),
      sorter: (a, b) => new Date(a.dateSent) - new Date(b.dateSent),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
      filters: [
        { text: 'Sent', value: 'sent' },
        { text: 'Pending', value: 'pending' },
        { text: 'Received', value: 'received' },
        { text: 'Rejected', value: 'rejected' },
      ],
      onFilter: (value, record) => record.status.toLowerCase() === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => navigate(`/transmittals/${record.id}`)}>
            View
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="transmittal-list-container">
      <div className="list-header">
        <h2>Transmittals</h2>
        <div className="list-controls">
          <Input.Search
            placeholder="Search transmittals..."
            allowClear
            enterButton
            prefix={<FaSearch />}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            onSearch={handleSearch}
            style={{ width: 300 }}
          />
          <Button 
            type="primary" 
            icon={<FaPlus />}
            onClick={() => navigate('/transmittals/create')}
          >
            New Transmittal
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredTransmittals}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default TransmittalList;