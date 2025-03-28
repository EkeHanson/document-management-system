// src/components/documents/DocumentStatusBadge.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import { 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  CloseCircleOutlined, 
  ExclamationCircleOutlined, 
  SyncOutlined 
} from '@ant-design/icons';

const statusConfig = {
  approved: {
    color: 'success',
    icon: <CheckCircleOutlined />,
    text: 'Approved'
  },
  pending: {
    color: 'processing',
    icon: <SyncOutlined spin />,
    text: 'Pending'
  },
  rejected: {
    color: 'error',
    icon: <CloseCircleOutlined />,
    text: 'Rejected'
  },
  under_review: {
    color: 'warning',
    icon: <ExclamationCircleOutlined />,
    text: 'Under Review'
  },
  overdue: {
    color: 'error',
    icon: <ClockCircleOutlined />,
    text: 'Overdue'
  },
  draft: {
    color: 'default',
    icon: null,
    text: 'Draft'
  }
};

const DocumentStatusBadge = ({ status }) => {
  const config = statusConfig[status] || {
    color: 'default',
    icon: null,
    text: status
  };

  return (
    <Tag 
      icon={config.icon} 
      color={config.color}
      style={{ textTransform: 'capitalize' }}
    >
      {config.text}
    </Tag>
  );
};

DocumentStatusBadge.propTypes = {
  status: PropTypes.oneOf([
    'approved',
    'pending',
    'rejected',
    'under_review',
    'overdue',
    'draft'
  ]).isRequired
};

export default DocumentStatusBadge;