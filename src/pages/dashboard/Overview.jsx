import React, { useState } from 'react';
import { useDocuments } from '../../hooks/useDocuments';
import { useProjects } from '../../hooks/useProjects';
import { FaFileAlt, FaProjectDiagram, FaClock, FaCalendarAlt, FaSearch, FaEye, FaDownload, FaShare, FaArrowRight } from 'react-icons/fa';
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

  // Get recent documents and projects
  const recentDocuments = [...documents]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 4); // Show 4 recent documents

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
            <FaFileAlt size={20} />
          </div>
          <div className="stat-content">
            <h3>Total Documents</h3>
            <p>{documents.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaProjectDiagram size={20} />
          </div>
          <div className="stat-content">
            <h3>Active Projects</h3>
            <p>{activeProjects.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaClock size={20} />
          </div>
          <div className="stat-content">
            <h3>Pending Reviews</h3>
            <p>{documents.filter(d => d.status === 'pending').length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaCalendarAlt size={20} />
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
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip 
              contentStyle={{
                background: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                padding: '12px'
              }}
            />
            <Legend />
            <Bar 
              dataKey="documents" 
              fill="#818cf8" 
              name="Documents" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="projects" 
              fill="#4fd1c5" 
              name="Projects" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Documents with Swagger */}
      <div className="recent-section">
        <div className="section-header">
          <h2>
            <FaFileAlt /> Recent Documents
          </h2>
          <a href="#" className="view-all-link">
            View All <FaArrowRight />
          </a>
        </div>
        <div className="documents-grid">
          {recentDocuments.map(doc => (
            <div key={doc.id} className="document-card">
              <div className="document-content">
                <div className="document-header">
                  <div className="document-title">
                    {doc.title}
                    <span className={`document-status status-${doc.status.toLowerCase()}`}>
                      {doc.status}
                    </span>
                  </div>
                  <p className="document-description">
                    {doc.description || 'No description available'}
                  </p>
                </div>
                <div className="document-meta">
                  <span>Updated: {new Date(doc.updatedAt).toLocaleDateString()}</span>
                  <span>By: {doc.author || 'Unknown'}</span>
                </div>
                <div className="document-footer">
                  <div className="document-actions">
                    <button className="document-action" title="View">
                      <FaEye />
                    </button>
                    <button className="document-action" title="Download">
                      <FaDownload />
                    </button>
                    <button className="document-action" title="Share">
                      <FaShare />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Projects */}
      <div className="recent-section">
        <div className="section-header">
          <h2>
            <FaProjectDiagram /> Active Projects
          </h2>
          <a href="#" className="view-all-link">
            View all <FaArrowRight size={12} />
          </a>
        </div>
        <div className="projects-grid">
          {activeProjects.slice(0, 4).map(project => (
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