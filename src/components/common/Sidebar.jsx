import React from 'react';
import { NavLink } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
import './StatusBadge.css'; // Or use Tailwind classes directly
import {
  FiHome,
  FiFile,
  FiImage,
  FiSend,
  FiClipboard,
  FiCalendar,
  FiBarChart2,
  FiUsers,
  FiSettings
} from 'react-icons/fi';

const Sidebar = () => {
  // const { "currentUser" } = useAuth();

  const navItems = [
    { path: '/dashboard', icon: <FiHome />, label: 'Dashboard' },
    { path: '/documents', icon: <FiFile />, label: 'Documents' },
    { path: '/drawings', icon: <FiImage />, label: 'Drawings' },
    { path: '/transmittals', icon: <FiSend />, label: 'Transmittals' },
    { path: '/projects', icon: <FiClipboard />, label: 'Projects' },
    { path: '/schedule', icon: <FiCalendar />, label: 'Schedule' },
    { path: '/reports', icon: <FiBarChart2 />, label: 'Reports' },
  ];

  const adminItems = [
    { path: '/admin/users', icon: <FiUsers />, label: 'Users' },
    { path: '/admin/settings', icon: <FiSettings />, label: 'Settings' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>DMS</h3>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-items">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        
        {"currentUser"?.role === 'admin' && (
          <div className="admin-section">
            <h4 className="section-title">Admin</h4>
            <ul className="nav-items">
              {adminItems.map((item, index) => (
                <li key={index}>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => 
                      isActive ? 'nav-link active' : 'nav-link'
                    }
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;