import React, { useState } from 'react';
import { Button, Dropdown, Menu, Checkbox } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

const DCIFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    disciplines: [],
    statuses: [],
    documentTypes: [],
  });

  const handleMenuClick = (e) => {
    // Filter logic would go here
    console.log('Filter clicked', e);
  };

  const handleFilterChange = (type, values) => {
    const newFilters = { ...filters, [type]: values };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const menu = (
    <Menu>
      <Menu.ItemGroup title="Discipline">
        <div className="px-4 py-2">
          <Checkbox.Group
            options={[
              { label: 'Architectural', value: 'Architectural' },
              { label: 'Structural', value: 'Structural' },
              { label: 'Mechanical', value: 'Mechanical' },
              { label: 'Electrical', value: 'Electrical' },
              { label: 'Plumbing', value: 'Plumbing' },
              { label: 'Civil', value: 'Civil' },
              { label: 'Landscape', value: 'Landscape' },
              { label: 'Fire Protection', value: 'Fire Protection' },
            ]}
            value={filters.disciplines}
            onChange={(values) => handleFilterChange('disciplines', values)}
          />
        </div>
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.ItemGroup title="Status">
        <div className="px-4 py-2">
          <Checkbox.Group
            options={[
              { label: 'Draft', value: 'Draft' },
              { label: 'For Review', value: 'For Review' },
              { label: 'Approved', value: 'Approved' },
              { label: 'Rejected', value: 'Rejected' },
              { label: 'Issued', value: 'Issued' },
            ]}
            value={filters.statuses}
            onChange={(values) => handleFilterChange('statuses', values)}
          />
        </div>
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.ItemGroup title="Document Type">
        <div className="px-4 py-2">
          <Checkbox.Group
            options={[
              { label: 'Drawing', value: 'Drawing' },
              { label: 'Specification', value: 'Specification' },
              { label: 'Report', value: 'Report' },
              { label: 'Manual', value: 'Manual' },
              { label: 'Calculation', value: 'Calculation' },
              { label: 'Schedule', value: 'Schedule' },
            ]}
            value={filters.documentTypes}
            onChange={(values) => handleFilterChange('documentTypes', values)}
          />
        </div>
      </Menu.ItemGroup>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button icon={<FilterOutlined />}>
        Filters
        {Object.values(filters).flat().length > 0 && (
          <span className="ml-1 text-blue-500">
            ({Object.values(filters).flat().length})
          </span>
        )}
      </Button>
    </Dropdown>
  );
};

export default DCIFilter;