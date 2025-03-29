import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DocumentContext from '../../contexts/DocumentContext';
import { AuthContext } from '../../contexts/AuthContext';
import { useDocuments } from '../../hooks/useDocuments';
import { Table, Button, Input, Select, Tag, Space, message, Card } from 'antd';
import { SearchOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import DrawingFilter from '../../components/drawings/DrawingFilter';
import Breadcrumbs from '../../components/common/Breadcrumbs';

const { Search } = Input;
const { Option } = Select;

const DrawingList = () => {
  const { currentProject } = useContext(AuthContext);
  const { drawings, loading, error, fetchDrawings } = useContext(DocumentContext);
  const [filteredDrawings, setFilteredDrawings] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [searchText, setSearchText] = useState('');
  const [sortField, setSortField] = useState('drawingNumber');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  useEffect(() => {
    if (currentProject) {
      fetchDrawings(currentProject.id);
    }
  }, [currentProject]);

  useEffect(() => {
    let filtered = [...drawings];
    
    // Apply search filter
    if (searchText) {
      filtered = filtered.filter(drawing => 
        drawing.drawingNumber.toLowerCase().includes(searchText.toLowerCase()) ||
        drawing.title.toLowerCase().includes(searchText.toLowerCase()) ||
        drawing.discipline.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    
    setFilteredDrawings(filtered);
  }, [drawings, searchText, sortField, sortOrder]);

  const handleSearch = value => {
    setSearchText(value);
    setPagination({ ...pagination, current: 1 });
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    if (sorter.field) {
      setSortField(sorter.field);
      setSortOrder(sorter.order === 'ascend' ? 'asc' : 'desc');
    }
  };

  const columns = [
    {
      title: 'Drawing Number',
      dataIndex: 'drawingNumber',
      key: 'drawingNumber',
      sorter: true,
      render: (text, record) => (
        <Link to={`/drawings/${record.id}`} className="text-blue-600 hover:underline">
          {text}
        </Link>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: true,
    },
    {
      title: 'Discipline',
      dataIndex: 'discipline',
      key: 'discipline',
      sorter: true,
      render: (text) => <Tag color={getDisciplineColor(text)}>{text}</Tag>,
    },
    {
      title: 'Revision',
      dataIndex: 'revision',
      key: 'revision',
      sorter: true,
      render: (text) => <span className="font-mono">{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      render: (text) => (
        <Tag color={getStatusColor(text)} className="capitalize">
          {text.toLowerCase()}
        </Tag>
      ),
    },
    {
      title: 'Last Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sorter: true,
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => navigate(`/drawings/${record.id}`)}>
            View
          </Button>
          <Button type="link" onClick={() => navigate(`/drawings/${record.id}/edit`)}>
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const getDisciplineColor = (discipline) => {
    const colors = {
      Architectural: 'magenta',
      Structural: 'red',
      Mechanical: 'volcano',
      Electrical: 'orange',
      Plumbing: 'gold',
      Civil: 'lime',
      Landscape: 'green',
      'Fire Protection': 'cyan',
    };
    return colors[discipline] || 'blue';
  };

  const getStatusColor = (status) => {
    const colors = {
      Draft: 'default',
      'For Review': 'processing',
      Approved: 'success',
      Rejected: 'error',
      Issued: 'green',
      'As Built': 'purple',
    };
    return colors[status] || 'default';
  };

  return (
    <div className="drawing-list-page">
      <Breadcrumbs items={[{ title: 'Home' }, { title: 'Drawings' }]} />
      
      <Card title="Drawing Register" className="mb-4">
        <div className="flex justify-between mb-4">
          <div className="flex space-x-2">
            <Search
              placeholder="Search drawings..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              className="w-64"
            />
            <DrawingFilter 
              onFilterChange={(filters) => {
                // Implement filter logic
              }}
            />
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => navigate('/drawings/upload')}
          >
            Upload Drawing
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={filteredDrawings}
          rowKey="id"
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          scroll={{ x: 'max-content' }}
        />
      </Card>
    </div>
  );
};

export default DrawingList;