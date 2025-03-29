import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Table, 
  Button, 
  Input, 
  Select, 
  Card, 
  Tag, 
  Space, 
  message, 
  Popconfirm, 
  Divider,
  Badge,
  Tabs,
  DatePicker
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  ImportOutlined, 
  ExportOutlined,
  DownloadOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SyncOutlined
} from '@ant-design/icons';
import DocumentContext from '../../contexts/DocumentContext';
import { AuthContext } from '../../contexts/AuthContext';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import DCIFilter from './DCIFilter';
import DCIStatusBadge from './DCIStatusBadge';

const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const DCIManagement = () => {
  const { currentProject } = useContext(AuthContext);
  const { dcis = [], loading, error, fetchDCIs, deleteDCI, exportDCI } = useContext(DocumentContext);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [dateRange, setDateRange] = useState([]);
  const navigate = useNavigate();

  // Memoized fetch function
  const fetchData = useCallback(() => {
    if (currentProject?.id) {
      fetchDCIs(currentProject.id);
    }
  }, [currentProject?.id, fetchDCIs]);

  // Fetch DCIs on mount or when project changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoized filtered DCIs
  const filteredDCIs = useMemo(() => {
    let filtered = [...(dcis || [])];
    
    // Apply tab filter
    if (activeTab !== 'all') {
      filtered = filtered.filter(dci => dci?.status === activeTab);
    }
    
    // Apply search filter
    if (searchText) {
      filtered = filtered.filter(dci => 
        dci?.documentNumber?.toLowerCase()?.includes(searchText.toLowerCase()) ||
        dci?.title?.toLowerCase()?.includes(searchText.toLowerCase()) ||
        dci?.discipline?.toLowerCase()?.includes(searchText.toLowerCase())
      );
    }
    
    // Apply date range filter
    if (dateRange?.length === 2) {
      const [startDate, endDate] = dateRange;
      filtered = filtered.filter(dci => {
        const dciDate = new Date(dci?.updatedAt);
        return dciDate >= startDate && dciDate <= endDate;
      });
    }
    
    return filtered;
  }, [dcis, activeTab, searchText, dateRange]);

  const handleSearch = value => {
    setSearchText(value);
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  const handleDelete = async (id) => {
    try {
      await deleteDCI(id);
      message.success('DCI record deleted successfully');
      fetchData();
    } catch (err) {
      message.error('Failed to delete DCI record');
    }
  };

  const handleExport = async (format) => {
    try {
      if (currentProject?.id) {
        await exportDCI(currentProject.id, format);
        message.success(`DCI exported as ${format.toUpperCase()} successfully`);
      }
    } catch (err) {
      message.error(`Failed to export DCI: ${err.message}`);
    }
  };

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

  const columns = [
    {
      title: 'Document Number',
      dataIndex: 'documentNumber',
      key: 'documentNumber',
      sorter: (a, b) => (a?.documentNumber || '').localeCompare(b?.documentNumber || ''),
      render: (text, record) => (
        <Link to={`/dci/${record?.id}`} className="font-medium text-blue-600">
          {text}
        </Link>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => (a?.title || '').localeCompare(b?.title || ''),
    },
    {
      title: 'Discipline',
      dataIndex: 'discipline',
      key: 'discipline',
      sorter: (a, b) => (a?.discipline || '').localeCompare(b?.discipline || ''),
      render: (text) => <Tag color={getDisciplineColor(text)}>{text}</Tag>,
    },
    {
      title: 'Revision',
      dataIndex: 'revision',
      key: 'revision',
      sorter: (a, b) => (a?.revision || '').localeCompare(b?.revision || ''),
      render: (text) => <span className="font-mono">{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => (a?.status || '').localeCompare(b?.status || ''),
      render: (text) => <DCIStatusBadge status={text} />,
    },
    {
      title: 'Last Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sorter: (a, b) => new Date(a?.updatedAt) - new Date(b?.updatedAt),
      render: (text) => text ? new Date(text).toLocaleDateString() : '',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => navigate(`/dci/${record?.id}`)}
          />
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => navigate(`/dci/${record?.id}/edit`)}
          />
          <Popconfirm
            title="Are you sure to delete this DCI record?"
            onConfirm={() => handleDelete(record?.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="dci-management-page">
      <Breadcrumbs items={[
        { title: 'Home' }, 
        { title: 'Document Control' },
        { title: 'Document Control Index (DCI)' }
      ]} />
      
      <Card 
        title="Document Control Index (DCI) Management"
        extra={
          <Space>
            <Button 
              type="default" 
              icon={<ImportOutlined />}
              onClick={() => navigate('/dci/import')}
            >
              Import DCI
            </Button>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => navigate('/dci/upload')}
            >
              Add DCI Record
            </Button>
          </Space>
        }
      >
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          tabBarExtraContent={
            <div className="flex items-center space-x-2">
              <RangePicker 
                onChange={(dates) => setDateRange(dates)}
                style={{ width: 250 }}
              />
              <Search
                placeholder="Search DCI..."
                allowClear
                enterButton={<SearchOutlined />}
                size="middle"
                onSearch={handleSearch}
                style={{ width: 250 }}
              />
              <DCIFilter 
                onFilterChange={(filters) => {
                  // Implement additional filter logic
                }}
              />
            </div>
          }
        >
          <TabPane tab={<span>All <Badge count={dcis?.length || 0} style={{ backgroundColor: '#1890ff' }} /></span>} key="all" />
          <TabPane tab={<span>Draft <Badge count={dcis?.filter(d => d?.status === 'Draft')?.length || 0} /></span>} key="Draft" />
          <TabPane tab={<span>For Review <Badge count={dcis?.filter(d => d?.status === 'For Review')?.length || 0} /></span>} key="For Review" />
          <TabPane tab={<span>Approved <Badge count={dcis?.filter(d => d?.status === 'Approved')?.length || 0} style={{ backgroundColor: '#52c41a' }} /></span>} key="Approved" />
          <TabPane tab={<span>Rejected <Badge count={dcis?.filter(d => d?.status === 'Rejected')?.length || 0} style={{ backgroundColor: '#f5222d' }} /></span>} key="Rejected" />
        </Tabs>

        <div className="mt-4 mb-4 flex justify-between">
          <div>
            <Button 
              icon={<SyncOutlined />} 
              onClick={fetchData}
              loading={loading}
            >
              Refresh
            </Button>
          </div>
          <Space>
            <Button 
              icon={<DownloadOutlined />}
              onClick={() => handleExport('csv')}
            >
              Export CSV
            </Button>
            <Button 
              icon={<ExportOutlined />}
              onClick={() => handleExport('excel')}
            >
              Export Excel
            </Button>
            <Button 
              icon={<DownloadOutlined />}
              onClick={() => handleExport('pdf')}
            >
              Export PDF
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredDCIs}
          rowKey="id"
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100'],
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
          onChange={(pagination) => setPagination(pagination)}
          scroll={{ x: 'max-content' }}
        />
      </Card>
    </div>
  );
};

export default DCIManagement;