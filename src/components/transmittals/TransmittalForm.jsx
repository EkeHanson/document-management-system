import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Button, 
  message, 
  Spin,
  Card,
  Row,
  Col,
  Divider
} from 'antd';
import { FaPaperclip, FaSave, FaTimes } from 'react-icons/fa';
import api from '../../services/api';
import DocumentSelector from '../documents/DocumentSelector';
import './TransmittalForm.css';

const { Option } = Select;
const { TextArea } = Input;

const TransmittalForm = ({ mode = 'create' }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (mode === 'edit' && id) {
      const fetchTransmittal = async () => {
        setLoading(true);
        try {
          const response = await api.get(`/transmittals/${id}`);
          form.setFieldsValue({
            ...response.data,
            dateSent: response.data.dateSent ? moment(response.data.dateSent) : null,
          });
          setSelectedDocuments(response.data.documents || []);
        } catch (error) {
          message.error('Failed to fetch transmittal details');
        } finally {
          setLoading(false);
        }
      };
      fetchTransmittal();
    }
  }, [mode, id, form]);

  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      const payload = {
        ...values,
        documents: selectedDocuments.map(doc => doc.id),
        dateSent: values.dateSent ? values.dateSent.toISOString() : new Date().toISOString(),
      };

      if (mode === 'create') {
        await api.post('/transmittals', payload);
        message.success('Transmittal created successfully');
      } else {
        await api.put(`/transmittals/${id}`, payload);
        message.success('Transmittal updated successfully');
      }
      navigate('/transmittals');
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to save transmittal');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDocumentSelect = (documents) => {
    setSelectedDocuments(documents);
  };

  const removeDocument = (docId) => {
    setSelectedDocuments(prev => prev.filter(doc => doc.id !== docId));
  };

  return (
    <div className="transmittal-form-container">
      <Spin spinning={loading}>
        <Card title={`${mode === 'create' ? 'Create' : 'Edit'} Transmittal`}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              status: 'draft',
              priority: 'normal'
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="referenceNumber"
                  label="Reference Number"
                  rules={[{ required: true, message: 'Please enter reference number' }]}
                >
                  <Input placeholder="TRN-YYYY-NNN" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="status"
                  label="Status"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option value="draft">Draft</Option>
                    <Option value="sent">Sent</Option>
                    <Option value="received">Received</Option>
                    <Option value="rejected">Rejected</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="subject"
              label="Subject"
              rules={[{ required: true, message: 'Please enter subject' }]}
            >
              <Input />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="recipient"
                  label="Recipient"
                  rules={[{ required: true, message: 'Please enter recipient' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="priority"
                  label="Priority"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option value="low">Low</Option>
                    <Option value="normal">Normal</Option>
                    <Option value="high">High</Option>
                    <Option value="urgent">Urgent</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="dateSent"
              label="Date Sent"
            >
              <DatePicker showTime style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
            >
              <TextArea rows={4} />
            </Form.Item>

            <Divider orientation="left">Attached Documents</Divider>
            
            <DocumentSelector 
              onSelect={handleDocumentSelect}
              selectedDocuments={selectedDocuments}
            />

            <div className="selected-documents">
              {selectedDocuments.map(doc => (
                <div key={doc.id} className="document-item">
                  <span>{doc.title} (v{doc.version})</span>
                  <Button 
                    type="text" 
                    icon={<FaTimes />} 
                    onClick={() => removeDocument(doc.id)}
                  />
                </div>
              ))}
            </div>

            <Form.Item className="form-actions">
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={submitting}
                icon={<FaSave />}
              >
                {mode === 'create' ? 'Create Transmittal' : 'Save Changes'}
              </Button>
              <Button 
                onClick={() => navigate('/transmittals')}
                style={{ marginLeft: 8 }}
                icon={<FaTimes />}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Spin>
    </div>
  );
};

export default TransmittalForm;