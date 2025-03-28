import React, { useState } from 'react';
import { Input, Select, Button, DatePicker, Space } from 'antd';
import { SearchOutlined, FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import './DrawingFilter.css';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const DrawingFilter = ({ 
  onSearch, 
  onFilterChange, 
  onReset,
  disciplines = [],
  projects = [],
  statuses = ['Active', 'Pending', 'Archived']
}) => {
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState({
    discipline: undefined,
    project: undefined,
    status: undefined,
    dateRange: null
  });

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    setSearchText('');
    setFilters({
      discipline: undefined,
      project: undefined,
      status: undefined,
      dateRange: null
    });
    onReset();
  };

  return (
    <div className="drawing-filter">
      <Space size="large" align="center">
        <Search
          placeholder="Search drawings..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={handleSearch}
          style={{ width: 300 }}
        />

        <Select
          placeholder="Filter by Discipline"
          style={{ width: 180 }}
          allowClear
          value={filters.discipline}
          onChange={(value) => handleFilterChange('discipline', value)}
        >
          {disciplines.map(discipline => (
            <Option key={discipline.id} value={discipline.id}>
              {discipline.name}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Filter by Project"
          style={{ width: 180 }}
          allowClear
          value={filters.project}
          onChange={(value) => handleFilterChange('project', value)}
        >
          {projects.map(project => (
            <Option key={project.id} value={project.id}>
              {project.name}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Filter by Status"
          style={{ width: 150 }}
          allowClear
          value={filters.status}
          onChange={(value) => handleFilterChange('status', value)}
        >
          {statuses.map(status => (
            <Option key={status} value={status}>
              {status}
            </Option>
          ))}
        </Select>

        <RangePicker
          placeholder={['Start Date', 'End Date']}
          onChange={(dates) => handleFilterChange('dateRange', dates)}
          value={filters.dateRange}
        />

        <Button 
          type="default" 
          icon={<ReloadOutlined />} 
          onClick={handleReset}
        >
          Reset
        </Button>
      </Space>
    </div>
  );
};

export default DrawingFilter;