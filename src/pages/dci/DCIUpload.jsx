import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  Button, 
  Card, 
  Form, 
  Input, 
  Select, 
  Divider, 
  message, 
  Tabs, 
  Table,
  Space,
  Alert
} from 'antd';
import { 
  UploadOutlined, 
  DownloadOutlined, 
  SaveOutlined, 
  CloseOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  ImportOutlined // Add this line
} from '@ant-design/icons';
import  DocumentContext from '../../contexts/DocumentContext';
import { AuthContext } from '../../contexts/AuthContext';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import DCITemplateDownload from './DCITemplateDownload';

const { Option } = Select;
const { TabPane } = Tabs;
const { Dragger } = Upload;

const DCIUploadImport = () => {
  const [form] = Form.useForm();
  const { currentProject, currentUser } = useContext(AuthContext);
  const { importDCI, uploadDCI, loading } = useContext(DocumentContext);
  const [activeTab, setActiveTab] = useState('manual');
  const [fileList, setFileList] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [importProgress, setImportProgress] = useState(0);
  const navigate = useNavigate();

  const beforeUpload = (file) => {
    const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                   file.type === 'application/vnd.ms-excel' || 
                   file.name.endsWith('.xlsx') || 
                   file.name.endsWith('.xls');
    if (!isExcel) {
      message.error('You can only upload Excel files!');
      return false;
    }
    
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('File must be smaller than 10MB!');
      return false;
    }
    
    // Simulate preview of imported data
    const mockPreviewData = [
      {
        key: '1',
        documentNumber: 'A-100',
        title: 'Architectural Floor Plan - Level 1',
        discipline: 'Architectural',
        revision: 'A',
        status: 'Draft',
      },
      {
        key: '2',
        documentNumber: 'S-200',
        title: 'Structural Foundation Plan',
        discipline: 'Structural',
        revision: 'B',
        status: 'For Review',
      },
    ];
    
    setTimeout(() => {
      setPreviewData(mockPreviewData);
      message.success('File parsed successfully. Previewing data...');
    }, 1500);
    
    return false; // Prevent automatic upload
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleManualSubmit = async (values) => {
    try {
      await uploadDCI({
        ...values,
        projectId: currentProject.id,
        userId: currentUser.id,
      });
      message.success('DCI record added successfully');
      navigate('/dci');
    } catch (error) {
      message.error(`Failed to add DCI record: ${error.message}`);
    }
  };

  const handleImportSubmit = async () => {
    if (fileList.length === 0) {
      message.error('Please select a file to import');
      return;
    }
    
    try {
      // Simulate import progress
      const interval = setInterval(() => {
        setImportProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 300);
      
      // In a real implementation, this would call importDCI with the file
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      message.success(`${previewData.length} DCI records imported successfully`);
      navigate('/dci');
    } catch (error) {
      message.error(`Failed to import DCI records: ${error.message}`);
    } finally {
      setImportProgress(0);
    }
  };

  const importColumns = [
    {
      title: 'Document Number',
      dataIndex: 'documentNumber',
      key: 'documentNumber',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Discipline',
      dataIndex: 'discipline',
      key: 'discipline',
      render: (text) => <Tag color={getDisciplineColor(text)}>{text}</Tag>,
    },
    {
      title: 'Revision',
      dataIndex: 'revision',
      key: 'revision',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <Tag color={getStatusColor(text)}>{text}</Tag>,
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
    };
    return colors[status] || 'default';
  };

  return (
    <div className="dci-upload-page">
      <Breadcrumbs items={[
        { title: 'Home' }, 
        { title: 'Document Control', path: '/dci' },
        { title: activeTab === 'manual' ? 'Add DCI Record' : 'Import DCI Records' }
      ]} />
      
      <Card title={activeTab === 'manual' ? 'Add New DCI Record' : 'Import DCI Records'}>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Manual Entry" key="manual">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleManualSubmit}
              initialValues={{
                discipline: 'Architectural',
                revision: 'A',
                status: 'Draft',
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="documentNumber"
                  label="Document Number"
                  rules={[{ required: true, message: 'Please enter document number' }]}
                >
                  <Input placeholder="e.g., A-100" />
                </Form.Item>
                
                <Form.Item
                  name="title"
                  label="Document Title"
                  rules={[{ required: true, message: 'Please enter document title' }]}
                >
                  <Input placeholder="e.g., Architectural Floor Plan - Level 1" />
                </Form.Item>
                
                <Form.Item
                  name="discipline"
                  label="Discipline"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option value="Architectural">Architectural</Option>
                    <Option value="Structural">Structural</Option>
                    <Option value="Mechanical">Mechanical</Option>
                    <Option value="Electrical">Electrical</Option>
                    <Option value="Plumbing">Plumbing</Option>
                    <Option value="Civil">Civil</Option>
                    <Option value="Landscape">Landscape</Option>
                    <Option value="Fire Protection">Fire Protection</Option>
                  </Select>
                </Form.Item>
                
                <Form.Item
                  name="revision"
                  label="Revision"
                  rules={[{ required: true }]}
                >
                  <Select>
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(letter => (
                      <Option key={letter} value={letter}>{letter}</Option>
                    ))}
                    <Option value="Preliminary">Preliminary</Option>
                    <Option value="For Construction">For Construction</Option>
                    <Option value="As Built">As Built</Option>
                  </Select>
                </Form.Item>
                
                <Form.Item
                  name="status"
                  label="Status"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option value="Draft">Draft</Option>
                    <Option value="For Review">For Review</Option>
                    <Option value="Approved">Approved</Option>
                    <Option value="Rejected">Rejected</Option>
                    <Option value="Issued">Issued</Option>
                  </Select>
                </Form.Item>
                
                <Form.Item
                  name="documentType"
                  label="Document Type"
                >
                  <Select>
                    <Option value="Drawing">Drawing</Option>
                    <Option value="Specification">Specification</Option>
                    <Option value="Report">Report</Option>
                    <Option value="Manual">Manual</Option>
                    <Option value="Calculation">Calculation</Option>
                    <Option value="Schedule">Schedule</Option>
                  </Select>
                </Form.Item>
              </div>
              
              <Form.Item
                name="remarks"
                label="Remarks"
              >
                <Input.TextArea rows={3} placeholder="Additional information about this document" />
              </Form.Item>
              
              <Divider />
              
              <Form.Item>
                <Space>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    icon={<SaveOutlined />}
                    loading={loading}
                  >
                    Save DCI Record
                  </Button>
                  <Button 
                    htmlType="button" 
                    onClick={() => navigate('/dci')}
                    icon={<CloseOutlined />}
                  >
                    Cancel
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </TabPane>
          
          <TabPane tab="Bulk Import" key="import">
            <Alert
              message="Import Instructions"
              description={
                <ul className="list-disc pl-5">
                  <li>Download the DCI template file to ensure proper formatting</li>
                  <li>Only Excel (.xlsx, .xls) files are supported</li>
                  <li>Maximum file size is 10MB</li>
                  <li>System will preview the data before import</li>
                </ul>
              }
              type="info"
              showIcon
              className="mb-4"
            />
            
            <DCITemplateDownload />
            
            <Divider>Upload File</Divider>
            
            <Dragger
              fileList={fileList}
              beforeUpload={beforeUpload}
              onChange={handleUploadChange}
              accept=".xlsx,.xls"
              maxCount={1}
              showUploadList={true}
              className="mb-6"
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single Excel file. The system will parse and preview the data.
              </p>
            </Dragger>
            
            {previewData.length > 0 && (
              <div className="mb-6">
                <h4 className="mb-2">Preview Data ({previewData.length} records)</h4>
                <Table 
                  columns={importColumns} 
                  dataSource={previewData} 
                  size="small" 
                  pagination={false}
                  scroll={{ x: 'max-content' }}
                />
              </div>
            )}
            
            <div className="flex justify-end">
              <Space>
                <Button 
                  onClick={() => {
                    setFileList([]);
                    setPreviewData([]);
                  }}
                  disabled={fileList.length === 0}
                >
                  Clear
                </Button>
                <Button 
                  type="primary" 
                  onClick={handleImportSubmit}
                  loading={loading || importProgress > 0}
                  disabled={previewData.length === 0}
                  icon={<ImportOutlined />}
                >
                  {importProgress > 0 ? `Importing (${importProgress}%)` : 'Import DCI Records'}
                </Button>
              </Space>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default DCIUploadImport;