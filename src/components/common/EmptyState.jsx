// src/components/common/EmptyState.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Empty, Button } from 'antd';
import {
  FolderOutlined,
  FileSearchOutlined,
  PlusOutlined
} from '@ant-design/icons';

const EmptyState = ({
  title = "No data available",
  description = "There are no items to display",
  iconType = "default",
  showAction = false,
  actionText = "Create New",
  onActionClick,
  customIcon,
  imageStyle
}) => {
  const getIcon = () => {
    if (customIcon) return customIcon;
    switch (iconType) {
      case 'search':
        return <FileSearchOutlined style={{ fontSize: '48px', color: '#bfbfbf' }} />;
      case 'project':
        return <FolderOutlined style={{ fontSize: '48px', color: '#bfbfbf' }} />;
      default:
        return null;
    }
  };

  return (
    <Empty
      image={getIcon() || Empty.PRESENTED_IMAGE_SIMPLE}
      imageStyle={{ height: 80, ...imageStyle }}
      description={
        <>
          <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>
            {title}
          </div>
          <div style={{ color: '#8c8c8c' }}>{description}</div>
        </>
      }
    >
      {showAction && (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onActionClick}
        >
          {actionText}
        </Button>
      )}
    </Empty>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  iconType: PropTypes.oneOf(['default', 'search', 'project']),
  showAction: PropTypes.bool,
  actionText: PropTypes.string,
  onActionClick: PropTypes.func,
  customIcon: PropTypes.node,
  imageStyle: PropTypes.object
};

EmptyState.defaultProps = {
  title: "No data available",
  description: "There are no items to display",
  iconType: "default",
  showAction: false,
  actionText: "Create New"
};

export default EmptyState;