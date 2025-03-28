import React, { useState, useEffect } from 'react';
import { useDocuments } from '../../hooks/useDocuments';
import { useProjects } from '../../hooks/useProjects';
import { FaFileAlt, FaProjectDiagram, FaClock, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DocumentCard from '../../components/documents/DocumentCard';
import ProjectCard from '../../components/projects/ProjectCard';
import './Overview.css';

const Overview = () => {
  const { documents, loading: docsLoading, error: docsError } = useDocuments();
  const { projects, loading: projectsLoading, error: projectsError } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Sample data for the chart
  const chartData = [
    { name: 'Jan', documents: 12, projects: 3 },
    { name: 'Feb', documents: 19, projects: 5 },
    { name: 'Mar', documents: 15, projects: 4 },
    { name: 'Apr', documents: 21, projects: 6 },
    { name: 'May', documents: 18, projects: 5 },
  ];

  // Filter documents based on search and filter
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || doc.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Get recent documents and projects
  const recentDocuments = [...documents]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 3);

  const activeProjects = projects.filter(project => project.status === 'active');

  return (
    <div className="overview-container">
      {/* Header Section */}
      <header className="overview-header">
        <h1>System Overview</h1>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaFileAlt size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Documents</h3>
            <p>{documents.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaProjectDiagram size={24} />
          </div>
          <div className="stat-content">
            <h3>Active Projects</h3>
            <p>{activeProjects.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaClock size={24} />
          </div>
          <div className="stat-content">
            <h3>Pending Reviews</h3>
            <p>{documents.filter(d => d.status === 'pending').length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaCalendarAlt size={24} />
          </div>
          <div className="stat-content">
            <h3>Upcoming Deadlines</h3>
            <p>{projects.filter(p => new Date(p.deadline) > new Date()).length}</p>
          </div>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="chart-container">
        <h2>Monthly Activity</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="documents" fill="#8884d8" name="Documents" />
            <Bar dataKey="projects" fill="#82ca9d" name="Projects" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Documents */}
      <div className="recent-section">
        <h2>Recent Documents</h2>
        <div className="documents-grid">
          {recentDocuments.map(doc => (
            <DocumentCard 
              key={doc.id} 
              document={doc} 
              showStatus={true}
              className="recent-document"
            />
          ))}
        </div>
      </div>

      {/* Active Projects */}
      <div className="recent-section">
        <h2>Active Projects</h2>
        <div className="projects-grid">
          {activeProjects.slice(0, 3).map(project => (
            <ProjectCard 
              key={project.id}
              project={project}
              showProgress={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;