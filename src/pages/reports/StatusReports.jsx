import React, { useState, useEffect } from 'react';
import { useProjects } from '../../hooks/useProjects';
import { useDocuments } from '../../hooks/useDocuments';
import { Table, Select, DatePicker, Button, Card, Statistic } from 'antd';
import { FileTextOutlined, TeamOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './reports.css';

const { Option } = Select;
const { RangePicker } = DatePicker;

const StatusReports = () => {
  const { projects, fetchProjects } = useProjects();
  const { documents, fetchDocuments } = useDocuments();
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState('global');
  const [dateRange, setDateRange] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchDocuments();
  }, []);

  useEffect(() => {
    filterData();
  }, [reportType, dateRange, selectedProject, documents]);

  const filterData = () => {
    setLoading(true);
    let data = [...documents];
    
    // Apply date range filter
    if (dateRange && dateRange.length === 2) {
      data = data.filter(doc => {
        const docDate = new Date(doc.updatedAt);
        return docDate >= dateRange[0] && docDate <= dateRange[1];
      });
    }
    
    // Apply project filter
    if (selectedProject) {
      data = data.filter(doc => doc.projectId === selectedProject);
    }
    
    // Apply report type specific filters
    if (reportType === 'discipline') {
      // Group by discipline
      const grouped = data.reduce((acc, doc) => {
        const key = doc.discipline || 'Other';
        if (!acc[key]) acc[key] = [];
        acc[key].push(doc);
        return acc;
      }, {});
      
      setFilteredData(Object.entries(grouped).map(([discipline, docs]) => ({
        key: discipline,
        discipline,
        count: docs.length,
        latestUpdate: new Date(Math.max(...docs.map(d => new Date(d.updatedAt)))).toLocaleDateString(),
        status: docs.every(d => d.status === 'Approved') ? 'Complete' : 'In Progress'
      })));
    } else {
      setFilteredData(data);
    }
    
    setLoading(false);
  };

  const columns = {
    global: [
      { title: 'Document Number', dataIndex: 'documentNumber', key: 'documentNumber' },
      { title: 'Title', dataIndex: 'title', key: 'title' },
      { title: 'Revision', dataIndex: 'revision', key: 'revision' },
      { title: 'Status', dataIndex: 'status', key: 'status' },
      { title: 'Last Updated', dataIndex: 'updatedAt', key: 'updatedAt', render: date => new Date(date).toLocaleString() },
    ],
    discipline: [
      { title: 'Discipline', dataIndex: 'discipline', key: 'discipline' },
      { title: 'Document Count', dataIndex: 'count', key: 'count' },
      { title: 'Latest Update', dataIndex: 'latestUpdate', key: 'latestUpdate' },
      { title: 'Status', dataIndex: 'status', key: 'status' },
    ],
    detailed: [
      { title: 'Document Number', dataIndex: 'documentNumber', key: 'documentNumber' },
      { title: 'Title', dataIndex: 'title', key: 'title' },
      { title: 'Discipline', dataIndex: 'discipline', key: 'discipline' },
      { title: 'Status', dataIndex: 'status', key: 'status' },
      { title: 'Current Revision', dataIndex: 'revision', key: 'revision' },
      { title: 'Owner', dataIndex: 'owner', key: 'owner' },
      { title: 'Last Updated', dataIndex: 'updatedAt', key: 'updatedAt', render: date => new Date(date).toLocaleString() },
    ]
  };

  const exportToPDF = () => {
    // Implementation for PDF export would go here
    console.log('Exporting to PDF...');
  };

  return (
    <div className="status-reports">
      <div className="report-controls">
        <Select 
          defaultValue="global" 
          style={{ width: 200 }} 
          onChange={setReportType}
        >
          <Option value="global">Global Status</Option>
          <Option value="discipline">Discipline-wise</Option>
          <Option value="detailed">Detailed Report</Option>
        </Select>
        
        <Select 
          style={{ width: 200 }} 
          placeholder="Select Project"
          onChange={setSelectedProject}
          allowClear
        >
          {projects.map(project => (
            <Option key={project._id} value={project._id}>{project.name}</Option>
          ))}
        </Select>
        
        <RangePicker 
          onChange={dates => setDateRange(dates)} 
          style={{ width: 250 }} 
        />
        
        <Button type="primary" onClick={exportToPDF} icon={<FileTextOutlined />}>
          Export Report
        </Button>
      </div>

      <div className="stats-overview">
        <Card>
          <Statistic 
            title="Total Documents" 
            value={filteredData.length} 
            prefix={<FileTextOutlined />} 
          />
        </Card>
        <Card>
          <Statistic 
            title="Active Projects" 
            value={projects.length} 
            prefix={<TeamOutlined />} 
          />
        </Card>
        <Card>
          <Statistic 
            title="Approved Documents" 
            value={filteredData.filter(d => d.status === 'Approved').length} 
            prefix={<CheckCircleOutlined />} 
          />
        </Card>
      </div>

      <Table 
        columns={columns[reportType]} 
        dataSource={filteredData} 
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default StatusReports;