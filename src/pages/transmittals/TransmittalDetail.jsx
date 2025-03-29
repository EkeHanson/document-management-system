import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Descriptions, 
  Button, 
  Card, 
  Tag, 
  Space, 
  Divider, 
  Tabs, 
  Table,
  Badge,
  message,
  Modal,
  Alert
} from 'antd';
import { 
  ArrowLeftOutlined, 
  EditOutlined, 
  DownloadOutlined,
  PrinterOutlined,
  ShareAltOutlined,
  FilePdfOutlined,
  MailOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
//import { DocumentContext } from '../../contexts/DocumentContext';
// import { AuthContext } from '../../contexts/AuthContext';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import TransmittalStatusBadge from './TransmittalStatusBadge';
import DocumentStatusBadge from '../documents/DocumentStatusBadge';
import CommentsSection from '../../components/comments/CommentSection';

const { TabPane } = Tabs;

const TransmittalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const { currentUser } = useContext(AuthContext);
  // const { 
  //   currentTransmittal, 
  //   loading, 
  //   error, 
  //   fetchTransmittal, 
  //   updateTransmittalStatus,
  //   downloadTransmittal,
  //   sendTransmittal
  // } = useContext(DocumentContext);
  const [activeTab, setActiveTab] = useState('details');
  const [isSending, setIsSending] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    fetchTransmittal(id);
  }, [id]);

  const handleSendTransmittal = async () => {
    setIsSending(true);
    try {
      await sendTransmittal(id);
      message.success('Transmittal sent successfully');
      fetchTransmittal(id); // Refresh data
    } catch (error) {
      message.error(`Failed to send transmittal: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadTransmittal(id);
      message.success('Transmittal download started');
    } catch (error) {
      message.error('Failed to download transmittal');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    Modal.confirm({
      title: `Mark as ${newStatus}?`,
      content: `Are you sure you want to mark this transmittal as ${newStatus}?`,
      onOk: async () => {
        try {
          await updateTransmittalStatus(id, newStatus);
          message.success(`Transmittal marked as ${newStatus}`);
          fetchTransmittal(id); // Refresh data
        } catch (error) {
          message.error(`Failed to update status: ${error.message}`);
        }
      },
    });
  };

  if (loading) return <div className="flex justify-center mt-8"><Spin size="large" /></div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!currentTransmittal) return <div className="text-center mt-8">Transmittal not found</div>;

  const documentColumns = [
    {
      title: 'Document Number',
      dataIndex: 'documentNumber',
      key: 'documentNumber',
      render: (text, record) => (
        <a 
          href={`/documents/${record.id}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600"
        >
          {text}
        </a>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Revision',
      dataIndex: 'revision',
      key: 'revision',
    },
    {
      title: 'Discipline',
      dataIndex: 'discipline',
      key: 'discipline',
      render: (text) => <Tag color={getDisciplineColor(text)}>{text}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <DocumentStatusBadge status={text} />,
    },
  ];

  const historyColumns = [
    {
      title: 'Date/Time',
      dataIndex: 'date',
      key: 'date',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'By',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
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

  const canEdit = currentTransmittal.status === 'Draft' && 
                 currentTransmittal.createdBy === currentUser.id;

  return (
    <div className="transmittal-detail-page">
      <Breadcrumbs items={[
        { title: 'Home' }, 
        { title: 'Transmittals', path: '/transmittals' },
        { title: currentTransmittal.transmittalNumber }
      ]} />
      
      <div className="flex justify-between items-center mb-4">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/transmittals')}
        >
          Back to Transmittals
        </Button>
        <Space>
          {canEdit && (
            <Button 
              icon={<EditOutlined />} 
              onClick={() => navigate(`/transmittals/${id}/edit`)}
            >
              Edit
            </Button>
          )}
          {currentTransmittal.status === 'Draft' && (
            <Button 
              type="primary" 
              icon={<MailOutlined />}
              loading={isSending}
              onClick={handleSendTransmittal}
            >
              Send Transmittal
            </Button>
          )}
          <Button 
            icon={<DownloadOutlined />} 
            loading={isDownloading}
            onClick={handleDownload}
          >
            Download
          </Button>
          <Button icon={<PrinterOutlined />}>Print</Button>
          <Button icon={<ShareAltOutlined />}>Share</Button>
        </Space>
      </div>

      <Card>
        <Descriptions 
          title={`Transmittal: ${currentTransmittal.transmittalNumber}`} 
          bordered 
          column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label="Date">
            {new Date(currentTransmittal.date).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <TransmittalStatusBadge status={currentTransmittal.status} />
          </Descriptions.Item>
          <Descriptions.Item label="Type">
            <Tag color="blue">{currentTransmittal.type}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Subject">
            {currentTransmittal.subject}
          </Descriptions.Item>
          <Descriptions.Item label="Recipient">
            {currentTransmittal.recipient}
          </Descriptions.Item>
          <Descriptions.Item label="Priority">
            <Tag color={getPriorityColor(currentTransmittal.priority)}>
              {currentTransmittal.priority}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Reference">
            {currentTransmittal.reference || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Due Date">
            {currentTransmittal.dueDate ? 
              new Date(currentTransmittal.dueDate).toLocaleDateString() : 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Created By">
            {currentTransmittal.createdBy}
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Details" key="details">
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-2">Description</h4>
              <p className="text-gray-700">
                {currentTransmittal.description || 'No description provided'}
              </p>
            </div>

            <Divider orientation="left">Documents ({currentTransmittal.documents?.length || 0})</Divider>
            
            <Table
              columns={documentColumns}
              dataSource={currentTransmittal.documents || []}
              rowKey="id"
              pagination={false}
              scroll={{ x: 'max-content' }}
            />

            {currentTransmittal.coverLetterRequired && (
              <>
                <Divider orientation="left">Cover Letter</Divider>
                <div className="p-4 border border-dashed border-gray-300 rounded">
                  <p className="text-gray-700">
                    {currentTransmittal.coverLetterContent || 
                    'Standard cover letter will be included with this transmittal.'}
                  </p>
                </div>
              </>
            )}
          </TabPane>
          
          <TabPane tab="History" key="history">
            <Table
              columns={historyColumns}
              dataSource={currentTransmittal.history || []}
              rowKey="date"
              pagination={false}
            />
          </TabPane>
          
          <TabPane tab="Comments" key="comments">
            <CommentsSection 
              documentId={id} 
              documentType="transmittal" 
            />
          </TabPane>
        </Tabs>

        {currentTransmittal.status === 'Draft' && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <h4 className="text-lg font-medium mb-2">Transmittal Actions</h4>
            <Space>
              <Button 
                type="primary" 
                icon={<CheckCircleOutlined />}
                onClick={() => handleStatusChange('Sent')}
              >
                Mark as Sent
              </Button>
              <Button 
                danger
                icon={<CloseCircleOutlined />}
                onClick={() => handleStatusChange('Cancelled')}
              >
                Cancel Transmittal
              </Button>
            </Space>
          </div>
        )}
      </Card>
    </div>
  );
};

const getPriorityColor = (priority) => {
  const colors = {
    Low: 'gray',
    Normal: 'blue',
    High: 'orange',
    Urgent: 'red',
  };
  return colors[priority] || 'blue';
};

export default TransmittalDetail;