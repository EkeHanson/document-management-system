import React from 'react';
import { Tag } from 'antd';
import { 
  ClockCircleOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined,
  MailOutlined,
  FileDoneOutlined
} from '@ant-design/icons';

const TransmittalStatusBadge = ({ status }) => {
  const statusConfig = {
    Draft: {
      color: 'default',
      icon: <ClockCircleOutlined />,
      text: 'Draft',
    },
    Sent: {
      color: 'processing',
      icon: <MailOutlined />,
      text: 'Sent',
    },
    Received: {
      color: 'success',
      icon: <CheckCircleOutlined />,
      text: 'Received',
    },
    Cancelled: {
      color: 'error',
      icon: <CloseCircleOutlined />,
      text: 'Cancelled',
    },
    Archived: {
      color: 'default',
      icon: <FileDoneOutlined />,
      text: 'Archived',
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

export default TransmittalStatusBadge;