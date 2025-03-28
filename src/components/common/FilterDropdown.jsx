// src/components/common/FilterDropdown.jsx
import React, { useState } from 'react';
import { Dropdown, Menu, Button, Input, Space } from 'antd';
import { 
  FilterOutlined, 
  CheckOutlined, 
  CloseOutlined 
} from '@ant-design/icons';
import PropTypes from 'prop-types';

const FilterDropdown = ({
  filters,
  selectedFilters,
  onFilterChange,
  placeholder = "Filter items",
  disabled = false
}) => {
  const [searchText, setSearchText] = useState('');
  const [visible, setVisible] = useState(false);

  const handleMenuClick = (filterKey, value) => {
    const newFilters = { ...selectedFilters };
    if (newFilters[filterKey]?.includes(value)) {
      newFilters[filterKey] = newFilters[filterKey].filter(v => v !== value);
    } else {
      newFilters[filterKey] = [...(newFilters[filterKey] || []), value];
    }
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    onFilterChange({});
    setSearchText('');
  };

  const menu = (
    <Menu style={{ padding: '8px', width: '250px' }}>
      <div style={{ marginBottom: '8px' }}>
        <Input
          placeholder="Search filters..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
        />
      </div>
      
      {filters.map(filter => (
        <Menu.ItemGroup key={filter.key} title={filter.label}>
          {filter.options
            .filter(option => 
              option.label.toLowerCase().includes(searchText.toLowerCase()) ||
              option.value.toLowerCase().includes(searchText.toLowerCase())
            )
            .map(option => (
              <Menu.Item 
                key={`${filter.key}-${option.value}`}
                onClick={() => handleMenuClick(filter.key, option.value)}
              >
                <Space>
                  {selectedFilters[filter.key]?.includes(option.value) ? (
                    <CheckOutlined style={{ color: '#1890ff' }} />
                  ) : null}
                  {option.label}
                </Space>
              </Menu.Item>
            ))}
        </Menu.ItemGroup>
      ))}
      
      <Menu.Divider />
      <Menu.Item 
        key="clear-all" 
        onClick={clearFilters}
        icon={<CloseOutlined />}
        disabled={Object.keys(selectedFilters).length === 0}
      >
        Clear all filters
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown 
      overlay={menu} 
      trigger={['click']} 
      visible={visible}
      onVisibleChange={setVisible}
      disabled={disabled}
    >
      <Button icon={<FilterOutlined />}>
        {placeholder}
        {Object.values(selectedFilters).flat().length > 0 && (
          <span style={{ marginLeft: '4px' }}>
            ({Object.values(selectedFilters).flat().length})
          </span>
        )}
      </Button>
    </Dropdown>
  );
};

FilterDropdown.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
          ]).isRequired,
          label: PropTypes.string.isRequired
        })
      ).isRequired
    })
  ).isRequired,
  selectedFilters: PropTypes.object,
  onFilterChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool
};

FilterDropdown.defaultProps = {
  selectedFilters: {},
  placeholder: "Filter items",
  disabled: false
};

export default FilterDropdown;