import React from 'react';
import { Badge, Tag } from 'antd';
import { 
  ClockCircleOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined,
  SyncOutlined,
  FileDoneOutlined
} from '@ant-design/icons';

const DCIStatusBadge = ({ status }) => {
  const statusConfig = {
    Draft: {
      color: 'default',
      icon: <ClockCircleOutlined />,
      text: 'Draft',
    },
    'For Review': {
      color: 'processing',
      icon: <SyncOutlined spin />,
      text: 'For Review',
    },
    Approved: {
      color: 'success',
      icon: <CheckCircleOutlined />,
      text: 'Approved',
    },
    Rejected: {
      color: 'error',
      icon: <CloseCircleOutlined />,
      text: 'Rejected',
    },
    Issued: {
      color: 'green',
      icon: <FileDoneOutlined />,
      text: 'Issued',
    },
  };

  const config = statusConfig[status] || {
    color: 'default',
    text: status,
  };

  return (
    <Tag icon={config.icon} color={config.color}>
      {config.text}
    </Tag>
  );
};

export default DCIStatusBadge;