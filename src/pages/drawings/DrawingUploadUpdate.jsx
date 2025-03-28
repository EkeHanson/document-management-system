import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DocumentContext } from '../../contexts/DocumentContext';
import { AuthContext } from '../../contexts/AuthContext';
import { 
  Form,   Input,  Button,  Upload,  Select, 
  DatePicker,  Card,  Spin, 
  message,  Divider,  Row, Col,
  Switch
} from 'antd';
import { 
  UploadOutlined, 
  SaveOutlined, 
  CloseOutlined,
  PaperClipOutlined
} from '@ant-design/icons';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import DrawingReferenceSelector from '../../components/drawings/DrawingReferenceSelector';

const { Option } = Select;
const { TextArea } = Input;

const DrawingUploadUpdate = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentProject, currentUser } = useContext(AuthContext);
  const { 
    currentDrawing, 
    loading, 
    fetchDrawing, 
    uploadDrawing, 
    updateDrawing,
    checkOutDrawing,
    checkInDrawing
  } = useContext(DocumentContext);
  const [fileList, setFileList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNewVersion, setIsNewVersion] = useState(false);
  const [isCheckOutRequired, setIsCheckOutRequired] = useState(false);

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      fetchDrawing(id);
    }
  }, [id, isEditMode]);

  useEffect(() => {
    if (currentDrawing && isEditMode) {
      form.setFieldsValue({
        drawingNumber: currentDrawing.drawingNumber,
        title: currentDrawing.title,
        discipline: currentDrawing.discipline,
        revision: currentDrawing.revision,
        status: currentDrawing.status,
        description: currentDrawing.description,
        sheetSize: currentDrawing.sheetSize,
        relatedDrawings: currentDrawing.relatedDrawings,
      });
      
      if (currentDrawing.fileUrl) {
        setFileList([{
          uid: '-1',
          name: currentDrawing.fileName || 'Current drawing file',
          status: 'done',
          url: currentDrawing.fileUrl,
        }]);
      }
      
      // Check if drawing is checked out by someone else
      if (currentDrawing.checkedOutBy && currentDrawing.checkedOutBy !== currentUser.id) {
        message.warning(`This drawing is currently checked out by ${currentDrawing.checkedOutBy}`);
        setIsCheckOutRequired(true);
      }
    }
  }, [currentDrawing, form, isEditMode, currentUser]);

  const beforeUpload = (file) => {
    const isDwgOrPdf = file.type === 'application/pdf' || file.name.endsWith('.dwg');
    if (!isDwgOrPdf) {
      message.error('You can only upload DWG or PDF files!');
    }
    
    const isLt50M = file.size / 1024 / 1024 < 50;
    if (!isLt50M) {
      message.error('File must be smaller than 50MB!');
    }
    
    return isDwgOrPdf && isLt50M;
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      
      // Add form values to FormData
      Object.keys(values).forEach(key => {
        if (values[key] !== undefined) {
          formData.append(key, values[key]);
        }
      });
      
      // Add file if it's a new upload or new version
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('file', fileList[0].originFileObj);
      }
      
      // Add project and user info
      formData.append('projectId', currentProject.id);
      formData.append('userId', currentUser.id);
      
      if (isEditMode) {
        formData.append('isNewVersion', isNewVersion);
        await updateDrawing(id, formData);
        message.success('Drawing updated successfully');
      } else {
        await uploadDrawing(formData);
        message.success('Drawing uploaded successfully');
      }
      
      navigate('/drawings');
    } catch (error) {
      message.error(`Failed to ${isEditMode ? 'update' : 'upload'} drawing: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      await checkOutDrawing(id, currentUser.id);
      message.success('Drawing checked out successfully. You can now edit it.');
      setIsCheckOutRequired(false);
      fetchDrawing(id); // Refresh drawing data
    } catch (error) {
      message.error(`Failed to check out drawing: ${error.message}`);
    }
  };

  const handleCancel = () => {
    navigate(isEditMode ? `/drawings/${id}` : '/drawings');
  };

  return (
    <div className="drawing-upload-page">
      <Breadcrumbs 
        items={[
          { title: 'Home' }, 
          { title: 'Drawings', path: '/drawings' },
          { title: isEditMode ? `Edit ${currentDrawing?.drawingNumber || ''}` : 'Upload Drawing' }
        ]} 
      />
      
      <Card 
        title={isEditMode ? `Edit Drawing: ${currentDrawing?.drawingNumber || ''}` : 'Upload New Drawing'}
        loading={loading && isEditMode}
      >
        {isCheckOutRequired && (
          <div className="mb-6 p-4 border border-orange-200 bg-orange-50 rounded">
            <p className="text-orange-700">
              This drawing is currently checked out by another user. You need to check it out first to make changes.
            </p>
            <Button 
              type="primary" 
              className="mt-2"
              onClick={handleCheckOut}
            >
              Check Out Drawing
            </Button>
          </div>
        )}
        
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            discipline: 'Architectural',
            revision: 'A',
            status: 'Draft',
            sheetSize: 'A1',
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="drawingNumber"
                label="Drawing Number"
                rules={[{ required: true, message: 'Please enter drawing number' }]}
              >
                <Input placeholder="e.g., A-100" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Drawing Title"
                rules={[{ required: true, message: 'Please enter drawing title' }]}
              >
                <Input placeholder="e.g., Floor Plan - Level 1" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={8}>
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
            </Col>
            <Col span={8}>
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
            </Col>
            <Col span={8}>
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
                  <Option value="As Built">As Built</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            name="description"
            label="Description"
          >
            <TextArea rows={3} placeholder="Detailed description of the drawing" />
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="sheetSize"
                label="Sheet Size"
              >
                <Select>
                  <Option value="A0">A0 (841 x 1189 mm)</Option>
                  <Option value="A1">A1 (594 x 841 mm)</Option>
                  <Option value="A2">A2 (420 x 594 mm)</Option>
                  <Option value="A3">A3 (297 x 420 mm)</Option>
                  <Option value="A4">A4 (210 x 297 mm)</Option>
                  <Option value="Arch E">Arch E (36 x 48 in)</Option>
                  <Option value="Arch D">Arch D (24 x 36 in)</Option>
                  <Option value="Arch C">Arch C (18 x 24 in)</Option>
                  <Option value="Arch B">Arch B (12 x 18 in)</Option>
                  <Option value="Arch A">Arch A (9 x 12 in)</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="relatedDrawings"
                label="Related Drawings"
              >
                <DrawingReferenceSelector 
                  currentProject={currentProject} 
                  currentDrawingId={id} 
                />
              </Form.Item>
            </Col>
          </Row>
          
          <Divider orientation="left">Drawing File</Divider>
          
          {isEditMode && (
            <Form.Item>
              <Switch
                checked={isNewVersion}
                onChange={setIsNewVersion}
                checkedChildren="New Version"
                unCheckedChildren="Update Metadata"
              />
              <span className="ml-2 text-gray-500">
                {isNewVersion ? 'Uploading a new version will increment the version number' : 
                 'Only update drawing metadata without changing the file'}
              </span>
            </Form.Item>
          )}
          
          <Form.Item
            name="file"
            label="Drawing File"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            rules={[
              {
                required: !isEditMode || isNewVersion,
                message: 'Please upload a drawing file',
              },
            ]}
            extra="Supported formats: .dwg, .pdf (Max 50MB)"
          >
            <Upload
              fileList={fileList}
              beforeUpload={beforeUpload}
              onChange={handleUploadChange}
              maxCount={1}
              accept=".dwg,.pdf"
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>
          
          <Divider />
          
          <Form.Item>
            <Space>
              <Button 
                type="primary" 
                htmlType="submit" 
                icon={<SaveOutlined />}
                loading={isSubmitting}
                disabled={isCheckOutRequired}
              >
                {isEditMode ? 'Update Drawing' : 'Upload Drawing'}
              </Button>
              <Button 
                htmlType="button" 
                onClick={handleCancel}
                icon={<CloseOutlined />}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default DrawingUploadUpdate;