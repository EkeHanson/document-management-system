// src/components/common/StatusBadge.jsx
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { 
  CheckCircleFilled,
  ClockCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
  SyncOutlined
} from '@ant-design/icons';
import './StatusBadge.css'; // Or use Tailwind classes directly

const StatusBadge = ({ status, size = 'default', className }) => {
  const statusConfig = {
    active: {
      icon: <CheckCircleFilled />,
      color: 'bg-green-100 text-green-800 border-green-200',
      text: 'Active',
      iconColor: 'text-green-500'
    },
    inactive: {
      icon: <CloseCircleFilled />,
      color: 'bg-red-100 text-red-800 border-red-200',
      text: 'Inactive',
      iconColor: 'text-red-500'
    },
    pending: {
      icon: <ClockCircleFilled />,
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      text: 'Pending',
      iconColor: 'text-yellow-500'
    },
    draft: {
      icon: null,
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      text: 'Draft',
      iconColor: 'text-gray-500'
    },
    archived: {
      icon: <ExclamationCircleFilled />,
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      text: 'Archived',
      iconColor: 'text-purple-500'
    },
    processing: {
      icon: <SyncOutlined spin />,
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      text: 'Processing',
      iconColor: 'text-blue-500'
    }
  };

  const sizeClasses = {
    small: 'text-xs py-0.5 px-2',
    default: 'text-sm py-1 px-3',
    large: 'text-base py-1.5 px-4'
  };

  const config = statusConfig[status] || {
    icon: null,
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    text: status,
    iconColor: 'text-gray-500'
  };

  return (
    <span
      className={classNames(
        'inline-flex items-center rounded-full border font-medium',
        config.color,
        sizeClasses[size],
        className
      )}
    >
      {config.icon && (
        <span className={classNames('mr-1.5', config.iconColor)}>
          {config.icon}
        </span>
      )}
      {config.text}
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.oneOf([
    'active',
    'inactive',
    'pending',
    'draft',
    'archived',
    'processing'
  ]).isRequired,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  className: PropTypes.string
};

export default StatusBadge;