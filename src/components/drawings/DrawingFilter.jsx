import React, { useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { DatePicker, Select, Button } from 'antd';
import './DrawingFilter.css';

const { Option } = Select;
const { RangePicker } = DatePicker;

const DrawingFilter = ({ onFilter, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    searchQuery: initialFilters.searchQuery || '',
    status: initialFilters.status || null,
    dateRange: initialFilters.dateRange || null,
    type: initialFilters.type || null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (dates) => {
    setFilters(prev => ({ ...prev, dateRange: dates }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      searchQuery: '',
      status: null,
      dateRange: null,
      type: null
    });
    onFilter({});
  };

  return (
    <div className="drawing-filter">
      <form onSubmit={handleSubmit}>
        <div className="filter-row">
          <div className="filter-group search-group">
            <FaSearch className="search-icon" />
            <input
              type="text"
              name="searchQuery"
              placeholder="Search drawings..."
              value={filters.searchQuery}
              onChange={handleInputChange}
            />
          </div>

          <div className="filter-group">
            <Select
              placeholder="Status"
              style={{ width: 150 }}
              value={filters.status}
              onChange={(value) => handleSelectChange('status', value)}
              allowClear
            >
              <Option value="approved">Approved</Option>
              <Option value="pending">Pending</Option>
              <Option value="rejected">Rejected</Option>
              <Option value="draft">Draft</Option>
            </Select>
          </div>

          <div className="filter-group">
            <Select
              placeholder="Type"
              style={{ width: 150 }}
              value={filters.type}
              onChange={(value) => handleSelectChange('type', value)}
              allowClear
            >
              <Option value="dwg">DWG</Option>
              <Option value="dxf">DXF</Option>
              <Option value="pdf">PDF</Option>
              <Option value="image">Image</Option>
            </Select>
          </div>

          <div className="filter-group">
            <RangePicker
              placeholder={['Start Date', 'End Date']}
              onChange={handleDateChange}
              value={filters.dateRange}
              style={{ width: 250 }}
            />
          </div>

          <div className="filter-actions">
            <Button type="primary" icon={<FaFilter />} htmlType="submit">
              Apply Filters
            </Button>
            <Button onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DrawingFilter;