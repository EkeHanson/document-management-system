// src/components/common/Tabs.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Tabs.css'; // Optional styling file

const Tabs = ({ 
  defaultActiveKey,
  children,
  centered = false,
  type = 'line',
  size = 'middle',
  onChange,
  className
}) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey);

  const handleTabChange = (key) => {
    setActiveKey(key);
    if (onChange) onChange(key);
  };

  const tabs = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return null;
    return {
      key: child.props.tabKey,
      label: child.props.tab,
      disabled: child.props.disabled,
      icon: child.props.icon,
      content: child
    };
  }).filter(Boolean);

  return (
    <div className={classNames('tabs-container', className, {
      'tabs-centered': centered,
      [`tabs-${type}`]: type,
      [`tabs-${size}`]: size
    })}>
      <div className="tabs-header">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={classNames('tab-button', {
              'active': activeKey === tab.key,
              'disabled': tab.disabled
            })}
            onClick={() => !tab.disabled && handleTabChange(tab.key)}
            disabled={tab.disabled}
          >
            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs-content">
        {tabs.find(tab => tab.key === activeKey)?.content}
      </div>
    </div>
  );
};

const TabPane = ({ children, tabKey, tab, disabled, icon }) => {
  return (
    <div className="tab-pane">
      {children}
    </div>
  );
};

TabPane.propTypes = {
  tabKey: PropTypes.string.isRequired,
  tab: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  disabled: PropTypes.bool,
  icon: PropTypes.node
};

Tabs.propTypes = {
  defaultActiveKey: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  centered: PropTypes.bool,
  type: PropTypes.oneOf(['line', 'card']),
  size: PropTypes.oneOf(['small', 'middle', 'large']),
  onChange: PropTypes.func,
  className: PropTypes.string
};

Tabs.TabPane = TabPane;

export default Tabs;