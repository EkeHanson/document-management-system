// src/components/projects/ProjectForm.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select, DatePicker, Row, Col, message } from 'antd';
//import { useProjectContext } from '../../contexts/ProjectContext';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

const ProjectForm = ({ project, onSuccess, mode = 'create' }) => {
  const [form] = Form.useForm();
  //const { createProject, updateProject } = useProjectContext();
  const [loading, setLoading] = useState(false);

  // Set form values when project data is provided (edit mode)
  useEffect(() => {
    if (project) {
      form.setFieldsValue({
        ...project,
        startDate: project.startDate ? dayjs(project.startDate) : null,
        endDate: project.endDate ? dayjs(project.endDate) : null
      });
    }
  }, [project, form]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formattedValues = {
        ...values,
        startDate: values.startDate ? values.startDate.format('YYYY-MM-DD') : null,
        endDate: values.endDate ? values.endDate.format('YYYY-MM-DD') : null
      };

      if (mode === 'create') {
        await createProject(formattedValues);
        message.success('Project created successfully');
      } else {
        await updateProject(project.id, formattedValues);
        message.success('Project updated successfully');
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      message.error(`Failed to ${mode} project: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        status: 'active',
        visibility: 'private'
      }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Project Name"
            rules={[{ required: true, message: 'Please enter project name' }]}
          >
            <Input placeholder="e.g. New Office Building Construction" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="code"
            label="Project Code"
            rules={[{ required: true, message: 'Please enter project code' }]}
          >
            <Input placeholder="e.g. PROJ-2023-001" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please enter project description' }]}
      >
        <TextArea rows={4} placeholder="Project description and objectives" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="planning">Planning</Option>
              <Option value="active">Active</Option>
              <Option value="on_hold">On Hold</Option>
              <Option value="completed">Completed</Option>
              <Option value="cancelled">Cancelled</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="visibility"
            label="Visibility"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="private">Private</Option>
              <Option value="team">Team</Option>
              <Option value="public">Public</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="client"
            label="Client"
          >
            <Input placeholder="Client name or organization" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="startDate"
            label="Start Date"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="endDate"
            label="End Date"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {mode === 'create' ? 'Create Project' : 'Update Project'}
        </Button>
      </Form.Item>
    </Form>
  );
};

ProjectForm.propTypes = {
  project: PropTypes.object,
  onSuccess: PropTypes.func,
  mode: PropTypes.oneOf(['create', 'edit'])
};

export default ProjectForm;