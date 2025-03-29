import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Form, 
  Input, 
  Button, 
  Select, 
  DatePicker, 
  Card, 
  Divider, 
  Table, 
  Tag,
  Space,
  message,
  Modal,
  AutoComplete,
  Checkbox
} from 'antd';
import { 
  SaveOutlined, 
  CloseOutlined,
  PlusOutlined,
  SearchOutlined,
  PaperClipOutlined
} from '@ant-design/icons';
//import { DocumentContext } from '../../contexts/DocumentContext';
// import { AuthContext } from '../../contexts/AuthContext';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import DocumentSelector from './DocumentSelector';

const { Option } = Select;
const { TextArea } = Input;

const CreateTransmittal = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // const { currentProject, currentUser } = useContext(AuthContext);
  // const { 
  //   documents, 
  //   recipients, 
  //   loading, 
  //   fetchDocuments, 
  //   fetchRecipients, 
  //   createTransmittal 
  // } = useContext(DocumentContext);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [documentSearchText, setDocumentSearchText] = useState('');
  const [isDocumentModalVisible, setIsDocumentModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentProject) {
      fetchDocuments(currentProject.id);
      fetchRecipients(currentProject.id);
    }
  }, [currentProject]);

  const filteredDocuments = documents.filter(doc => 
    doc.documentNumber.toLowerCase().includes(documentSearchText.toLowerCase()) ||
    doc.title.toLowerCase().includes(documentSearchText.toLowerCase())
  );

  const handleSubmit = async (values) => {
    if (selectedDocuments.length === 0) {
      message.error('Please add at least one document to the transmittal');
      return;
    }

    setIsSubmitting(true);
    try {
      await createTransmittal({
        ...values,
        projectId: currentProject.id,
        createdBy: currentUser.id,
        documents: selectedDocuments.map(doc => doc.id),
        date: values.date.format('YYYY-MM-DD'),
      });
      message.success('Transmittal created successfully');
      navigate('/transmittals');
    } catch (error) {
      message.error(`Failed to create transmittal: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddDocuments = (selectedDocs) => {
    setSelectedDocuments([...selectedDocuments, ...selectedDocs]);
    setIsDocumentModalVisible(false);
    message.success(`${selectedDocs.length} document(s) added to transmittal`);
  };

  const handleRemoveDocument = (docId) => {
    setSelectedDocuments(selectedDocuments.filter(doc => doc.id !== docId));
  };

  const documentColumns = [
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
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="link" 
          danger
          onClick={() => handleRemoveDocument(record.id)}
        >
          Remove
        </Button>
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

  return (
    <div className="create-transmittal-page">
      <Breadcrumbs items={[
        { title: 'Home' }, 
        { title: 'Transmittals', path: '/transmittals' },
        { title: 'Create Transmittal' }
      ]} />
      
      <Card title="Create New Transmittal">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            type: 'Submission',
            status: 'Draft',
            priority: 'Normal',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item
              name="transmittalNumber"
              label="Transmittal Number"
              rules={[{ required: true, message: 'Please enter transmittal number' }]}
            >
              <Input placeholder="Auto-generated if left blank" disabled />
            </Form.Item>
            
            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: 'Please select date' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item
              name="reference"
              label="Reference"
            >
              <Input placeholder="e.g., Client RFI #123" />
            </Form.Item>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="recipient"
              label="Recipient"
              rules={[{ required: true, message: 'Please select recipient' }]}
            >
              <AutoComplete
                options={recipients.map(recipient => ({
                  value: recipient.id,
                  label: recipient.name,
                }))}
                placeholder="Select or type to search recipients"
                filterOption={(inputValue, option) =>
                  option.label.toLowerCase().includes(inputValue.toLowerCase())
                }
              />
            </Form.Item>
            
            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="Submission">Submission</Option>
                <Option value="Response">Response</Option>
                <Option value="Information">Information</Option>
                <Option value="Request">Request</Option>
              </Select>
            </Form.Item>
          </div>
          
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: 'Please enter subject' }]}
          >
            <Input placeholder="Brief description of the transmittal" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Description"
          >
            <TextArea rows={3} placeholder="Detailed description of the transmittal" />
          </Form.Item>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item
              name="priority"
              label="Priority"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="Low">Low</Option>
                <Option value="Normal">Normal</Option>
                <Option value="High">High</Option>
                <Option value="Urgent">Urgent</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="Draft">Draft</Option>
                <Option value="Sent">Sent</Option>
                <Option value="Received">Received</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="dueDate"
              label="Due Date (if applicable)"
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </div>
          
          <Divider orientation="left">Documents</Divider>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Attached Documents ({selectedDocuments.length})</span>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsDocumentModalVisible(true)}
              >
                Add Documents
              </Button>
            </div>
            
            {selectedDocuments.length > 0 ? (
              <Table
                columns={documentColumns}
                dataSource={selectedDocuments}
                rowKey="id"
                size="small"
                pagination={false}
                scroll={{ x: 'max-content' }}
              />
            ) : (
              <div className="p-4 border border-dashed border-gray-300 rounded text-center">
                <PaperClipOutlined className="text-gray-400 text-2xl mb-2" />
                <p className="text-gray-500">No documents added to this transmittal</p>
              </div>
            )}
          </div>
          
          <Form.Item
            name="coverLetterRequired"
            valuePropName="checked"
          >
            <Checkbox>Include cover letter with this transmittal</Checkbox>
          </Form.Item>
          
          <Divider />
          
          <Form.Item>
            <Space>
              <Button 
                type="primary" 
                htmlType="submit" 
                icon={<SaveOutlined />}
                loading={isSubmitting}
              >
                Create Transmittal
              </Button>
              <Button 
                htmlType="button" 
                onClick={() => navigate('/transmittals')}
                icon={<CloseOutlined />}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
      
      <DocumentSelector
        visible={isDocumentModalVisible}
        onCancel={() => setIsDocumentModalVisible(false)}
        onSelect={handleAddDocuments}
        documents={filteredDocuments}
        selectedDocuments={selectedDocuments}
        searchText={documentSearchText}
        onSearch={setDocumentSearchText}
      />
    </div>
  );
};

export default CreateTransmittal;