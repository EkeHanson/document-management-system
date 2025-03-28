import React, { useState, useEffect, useContext } from 'react';
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
  Badge,
  Tabs,
  DatePicker,
  Dropdown,
  Menu
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  FilterOutlined,
  DownloadOutlined,
  MoreOutlined,
  EyeOutlined,
  EditOutlined,
  FilePdfOutlined,
  FileExcelOutlined
} from '@ant-design/icons';
import { DocumentContext } from '../../contexts/DocumentContext';
import { AuthContext } from '../../contexts/AuthContext';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import TransmittalStatusBadge from '../../components/transmittals/TransmittalStatusBadge';
import { formatDate, formatDateTime, formatDateForTable } from '../../utils/dateUtils';

const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const TransmittalList = () => {
  const { currentProject } = useContext(AuthContext);
  const { transmittals, loading, error, fetchTransmittals } = useContext(DocumentContext);
  const [filteredTransmittals, setFilteredTransmittals] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [dateRange, setDateRange] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentProject) {
      fetchTransmittals(currentProject.id);
    }
  }, [currentProject]);

  useEffect(() => {
    let filtered = [...transmittals];
    
    if (activeTab !== 'all') {
      filtered = filtered.filter(transmittal => transmittal.status === activeTab);
    }
    
    if (searchText) {
      filtered = filtered.filter(transmittal => 
        transmittal.transmittalNumber.toLowerCase().includes(searchText.toLowerCase()) ||
        transmittal.subject.toLowerCase().includes(searchText.toLowerCase()) ||
        transmittal.recipient.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    if (dateRange.length === 2) {
      filtered = filtered.filter(transmittal => {
        const transmittalDate = new Date(transmittal.date);
        return transmittalDate >= dateRange[0] && transmittalDate <= dateRange[1];
      });
    }
    
    setFilteredTransmittals(filtered);
  }, [transmittals, activeTab, searchText, dateRange]);

  const handleSearch = value => {
    setSearchText(value);
    setPagination({ ...pagination, current: 1 });
  };

  const handleExport = (format) => {
    message.success(`Transmittals exported as ${format.toUpperCase()} successfully`);
  };

  const columns = [
    {
      title: 'Transmittal #',
      dataIndex: 'transmittalNumber',
      key: 'transmittalNumber',
      sorter: (a, b) => a.transmittalNumber.localeCompare(b.transmittalNumber),
      render: (text, record) => (
        <Link to={`/transmittals/${record.id}`} className="font-medium text-blue-600">
          {text}
        </Link>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (text) => formatDateForTable(text),
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      sorter: (a, b) => a.subject.localeCompare(b.subject),
    },
    {
      title: 'Recipient',
      dataIndex: 'recipient',
      key: 'recipient',
      sorter: (a, b) => a.recipient.localeCompare(b.recipient),
      render: (text) => text || 'N/A',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (text) => <TransmittalStatusBadge status={text} />,
    },
    {
      title: 'Documents',
      dataIndex: 'documentCount',
      key: 'documentCount',
      sorter: (a, b) => a.documentCount - b.documentCount,
      render: (text) => <Badge count={text} style={{ backgroundColor: '#1890ff' }} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item 
                icon={<EyeOutlined />} 
                onClick={() => navigate(`/transmittals/${record.id}`)}
              >
                View Details
              </Menu.Item>
              <Menu.Item 
                icon={<EditOutlined />} 
                onClick={() => navigate(`/transmittals/${record.id}/edit`)}
                disabled={record.status !== 'Draft'}
              >
                Edit
              </Menu.Item>
              <Menu.Item 
                icon={<FilePdfOutlined />} 
                onClick={() => handleExport('pdf')}
              >
                Export as PDF
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="transmittal-list-page">
      <Breadcrumbs items={[
        { title: 'Home' }, 
        { title: 'Transmittals' }
      ]} />
      
      <Card 
        title="Transmittal Register"
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => navigate('/transmittals/create')}
          >
            Create Transmittal
          </Button>
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
                placeholder="Search transmittals..."
                allowClear
                enterButton={<SearchOutlined />}
                size="middle"
                onSearch={handleSearch}
                style={{ width: 250 }}
              />
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.ItemGroup title="Filter by Recipient">
                      <Menu.Item key="client">Client</Menu.Item>
                      <Menu.Item key="contractor">Contractor</Menu.Item>
                      <Menu.Item key="consultant">Consultant</Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.Divider />
                    <Menu.ItemGroup title="Filter by Type">
                      <Menu.Item key="submission">Submission</Menu.Item>
                      <Menu.Item key="response">Response</Menu.Item>
                      <Menu.Item key="information">Information</Menu.Item>
                    </Menu.ItemGroup>
                  </Menu>
                }
                trigger={['click']}
              >
                <Button icon={<FilterOutlined />}>Filters</Button>
              </Dropdown>
            </div>
          }
        >
          <TabPane tab={<span>All <Badge count={transmittals.length} style={{ backgroundColor: '#1890ff' }} /></span>} key="all" />
          <TabPane tab={<span>Draft <Badge count={transmittals.filter(t => t.status === 'Draft').length} /></span>} key="Draft" />
          <TabPane tab={<span>Sent <Badge count={transmittals.filter(t => t.status === 'Sent').length} style={{ backgroundColor: '#52c41a' }} /></span>} key="Sent" />
          <TabPane tab={<span>Received <Badge count={transmittals.filter(t => t.status === 'Received').length} style={{ backgroundColor: '#faad14' }} /></span>} key="Received" />
          <TabPane tab={<span>Archived <Badge count={transmittals.filter(t => t.status === 'Archived').length} style={{ backgroundColor: '#9e9e9e' }} /></span>} key="Archived" />
        </Tabs>

        <div className="mt-4 mb-4 flex justify-end">
          <Space>
            <Button 
              icon={<DownloadOutlined />}
              onClick={() => handleExport('csv')}
            >
              Export CSV
            </Button>
            <Button 
              icon={<FileExcelOutlined />}
              onClick={() => handleExport('excel')}
            >
              Export Excel
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredTransmittals}
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

export default TransmittalList;