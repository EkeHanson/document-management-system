import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { FaBell, FaFileAlt, FaProjectDiagram, FaClock, FaSearch, FaCalendarAlt } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';
// Add this import at the top with your other imports
import Notifications from './Notifications';


const Dashboard = () => {
  // const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data - in a real app, this would come from API
  const recentDocuments = [
    { id: 1, name: 'Project Scope v2.0', type: 'docx', date: '2023-06-15', status: 'approved' },
    { id: 2, name: 'Floor Plan - Level 3', type: 'dwg', date: '2023-06-14', status: 'in-review' },
    { id: 3, name: 'Structural Calculations', type: 'pdf', date: '2023-06-13', status: 'pending' }
  ];

  const upcomingDeadlines = [
    { id: 1, title: 'Electrical Layouts', date: '2023-06-20', daysLeft: 2 },
    { id: 2, title: 'Mechanical Specs', date: '2023-06-22', daysLeft: 4 }
  ];

  const documentStatusData = [
    { name: 'Approved', count: 45 },
    { name: 'Pending', count: 12 },
    { name: 'Rejected', count: 3 },
    { name: 'In Review', count: 8 },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        {/* <h1>Welcome back, {user?.name || 'User'}</h1> */}
        <h1>Welcome back, {'User'}</h1>
        <div className="header-actions">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search documents, projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="notification-badge">
            <FaBell />
            {unreadNotifications > 0 && (
              <span className="badge-count">{unreadNotifications}</span>
            )}
          </button>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="dashboard-content">
          <div className="stats-grid">
            {/* Stat Card 1 - Direct implementation */}
            <div className="stat-card" style={{ borderTop: '4px solid #4b6cb7' }}>
              <div className="stat-icon" style={{ color: '#4b6cb7' }}>
                <FaFileAlt />
              </div>
              <div className="stat-content">
                <h3>Total Documents</h3>
                <p className="stat-value">142</p>
                <p className="stat-trend">+12% from last month</p>
              </div>
            </div>

            {/* Stat Card 2 - Direct implementation */}
            <div className="stat-card" style={{ borderTop: '4px solid #2a9d8f' }}>
              <div className="stat-icon" style={{ color: '#2a9d8f' }}>
                <FaProjectDiagram />
              </div>
              <div className="stat-content">
                <h3>Active Projects</h3>
                <p className="stat-value">5</p>
                <p className="stat-trend">3 new this month</p>
              </div>
            </div>

            {/* Stat Card 3 - Direct implementation */}
            <div className="stat-card" style={{ borderTop: '4px solid #e9c46a' }}>
              <div className="stat-icon" style={{ color: '#e9c46a' }}>
                <FaClock />
              </div>
              <div className="stat-content">
                <h3>Pending Approvals</h3>
                <p className="stat-value">8</p>
                <p className="stat-trend">2 urgent</p>
              </div>
            </div>

            {/* Stat Card 4 - Direct implementation */}
            <div className="stat-card" style={{ borderTop: '4px solid #f4a261' }}>
              <div className="stat-icon" style={{ color: '#f4a261' }}>
                <FaCalendarAlt />
              </div>
              <div className="stat-content">
                <h3>Upcoming Deadlines</h3>
                <p className="stat-value">5</p>
                <p className="stat-trend">3 this week</p>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="charts-row">
            <div className="chart-card">
              <h3>Document Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={documentStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#4b6cb7" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Documents Section */}
          <div className="data-section">
            <h2>Recent Documents</h2>
            <div className="documents-list">
              {recentDocuments.map((doc) => (
                <div key={doc.id} className="document-item">
                  <div className="document-icon">
                    {doc.type === 'dwg' ? (
                      <img src="/icons/dwg-icon.png" alt="DWG" />
                    ) : (
                      <FaFileAlt />
                    )}
                  </div>
                  <div className="document-info">
                    <h3>{doc.name}</h3>
                    <p>Uploaded: {doc.date}</p>
                  </div>
                  <span className={`status-badge ${doc.status}`}>
                    {doc.status.replace('-', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines Section */}
          <div className="data-section">
            <h2>Upcoming Deadlines</h2>
            <div className="deadlines-list">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="deadline-item">
                  <div className="deadline-info">
                    <h3>{deadline.title}</h3>
                    <p>Due: {deadline.date}</p>
                  </div>
                  <span className="days-badge">
                    {deadline.daysLeft} day{deadline.daysLeft !== 1 ? 's' : ''} left
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'overview' && (
              <div className="dashboard-content">
                {/* ... existing overview content ... */}
              </div>
            )}

            {activeTab === 'notifications' && <Notifications />}
          </div>
  );
};

export default Dashboard;