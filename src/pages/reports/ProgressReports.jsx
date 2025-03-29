import React, { useState, useEffect } from 'react';
import { useProjects } from '../../hooks/useProjects';
import { useDocuments } from '../../hooks/useDocuments';
import { Card, Select, DatePicker, Button, Table, Progress, Row, Col, Tag } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileExcelOutlined, CalendarOutlined } from '@ant-design/icons';
import './reports.css';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ProgressReports = () => {
  const { projects, fetchProjects } = useProjects();
  const { documents, fetchDocuments } = useDocuments();
  const [loading, setLoading] = useState(false);
  const [reportPeriod, setReportPeriod] = useState('weekly');
  const [dateRange, setDateRange] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchDocuments();
  }, []);

  useEffect(() => {
    generateReport();
  }, [reportPeriod, dateRange, selectedProject, documents]);

  const generateReport = () => {
    setLoading(true);
    
    let filteredDocs = [...documents];
    
    // Apply project filter
    if (selectedProject) {
      filteredDocs = filteredDocs.filter(doc => doc.projectId === selectedProject);
    }
    
    // Apply date range filter
    if (dateRange && dateRange.length === 2) {
      filteredDocs = filteredDocs.filter(doc => {
        const docDate = new Date(doc.updatedAt);
        return docDate >= dateRange[0] && docDate <= dateRange[1];
      });
    }
    
    // Generate progress data
    const statusCounts = filteredDocs.reduce((acc, doc) => {
      acc[doc.status] = (acc[doc.status] || 0) + 1;
      return acc;
    }, {});
    
    const total = filteredDocs.length;
    const progressItems = Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
      percent: Math.round((count / total) * 100),
    }));
    
    setProgressData(progressItems);
    
    // Generate chart data by period
    let periodData = [];
    if (reportPeriod === 'daily') {
      // Group by day
      const byDay = filteredDocs.reduce((acc, doc) => {
        const date = new Date(doc.updatedAt).toLocaleDateString();
        if (!acc[date]) acc[date] = { date, created: 0, approved: 0, revised: 0 };
        
        if (doc.status === 'Approved') acc[date].approved++;
        else if (doc.status === 'Revised') acc[date].revised++;
        else acc[date].created++;
        
        return acc;
      }, {});
      
      periodData = Object.values(byDay);
    } else if (reportPeriod === 'weekly') {
      // Group by week
      const byWeek = filteredDocs.reduce((acc, doc) => {
        const date = new Date(doc.updatedAt);
        const weekNum = getWeekNumber(date);
        const weekKey = `Week ${weekNum}`;
        
        if (!acc[weekKey]) acc[weekKey] = { period: weekKey, created: 0, approved: 0, revised: 0 };
        
        if (doc.status === 'Approved') acc[weekKey].approved++;
        else if (doc.status === 'Revised') acc[weekKey].revised++;
        else acc[weekKey].created++;
        
        return acc;
      }, {});
      
      periodData = Object.values(byWeek);
    } else {
      // Monthly grouping
      const byMonth = filteredDocs.reduce((acc, doc) => {
        const date = new Date(doc.updatedAt);
        const monthKey = date.toLocaleString('default', { month: 'long' });
        
        if (!acc[monthKey]) acc[monthKey] = { period: monthKey, created: 0, approved: 0, revised: 0 };
        
        if (doc.status === 'Approved') acc[monthKey].approved++;
        else if (doc.status === 'Revised') acc[monthKey].revised++;
        else acc[monthKey].created++;
        
        return acc;
      }, {});
      
      periodData = Object.values(byMonth);
    }
    
    setChartData(periodData);
    setLoading(false);
  };

  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const exportToExcel = () => {
    // Implementation for Excel export would go here
    console.log('Exporting progress report to Excel...');
  };

  const columns = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={
          status === 'Approved' ? 'green' : 
          status === 'Pending' ? 'orange' : 
          status === 'Revised' ? 'blue' : 'gray'
        }>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Document Count',
      dataIndex: 'count',
      key: 'count',
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: 'Percentage',
      dataIndex: 'percent',
      key: 'percent',
      render: percent => <Progress percent={percent} size="small" />,
      sorter: (a, b) => a.percent - b.percent,
    },
  ];

  return (
    <div className="progress-reports">
      <div className="report-controls">
        <Select 
          defaultValue="weekly" 
          style={{ width: 120 }} 
          onChange={setReportPeriod}
        >
          <Option value="daily">Daily</Option>
          <Option value="weekly">Weekly</Option>
          <Option value="monthly">Monthly</Option>
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
        
        <Button 
          type="primary" 
          onClick={exportToExcel} 
          icon={<FileExcelOutlined />}
        >
          Export Report
        </Button>
      </div>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Card title="Document Status Progress" loading={loading}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="created" fill="#8884d8" name="Created" />
                <Bar dataKey="approved" fill="#82ca9d" name="Approved" />
                <Bar dataKey="revised" fill="#ffc658" name="Revised" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Card title="Document Status Breakdown" loading={loading}>
            <Table 
              columns={columns} 
              dataSource={progressData} 
              pagination={false}
              rowKey="status"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProgressReports;