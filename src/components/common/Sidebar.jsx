
import './StatusBadge.css'; // Or use Tailwind classes directly
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
import {
  FiHome,
  FiFile,
  FiImage,
  FiSend,
  FiClipboard,
  FiCalendar,
  FiBarChart2,
  FiUsers,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiFileText,
  FiClock,
  FiLayers, FiChevronDown
} from 'react-icons/fi';

const Sidebar = () => {
 // const { currentUser } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [activePath, setActivePath] = useState('');

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const mainNavItems = [
    { path: '/dashboard', icon: <FiHome />, label: 'Dashboard' },
    { path: '/documents', icon: <FiFile />, label: 'Documents', subItems: [
      { path: '/documents/upload', icon: <FiPlus />, label: 'Upload' }
    ]},
    { path: '/drawings', icon: <FiImage />, label: 'Drawings' },
    { path: '/transmittals', icon: <FiSend />, label: 'Transmittals', subItems: [
      { path: '/transmittals/create', icon: <FiPlus />, label: 'Create' }
    ]},
    { path: '/projects', icon: <FiClipboard />, label: 'Projects' },
    { path: '/schedule', icon: <FiCalendar />, label: 'Schedule', subItems: [
      { path: '/schedule/deadlines', icon: <FiClock />, label: 'Deadlines' }
    ]},
    { path: '/reports', icon: <FiBarChart2 />, label: 'Reports', subItems: [
      { path: '/reports/audit-trail', icon: <FiFileText />, label: 'Audit Trail' },
      { path: '/reports/progress', icon: <FiLayers />, label: 'Progress' }
    ]},
    { path: '/dci', icon: <FiFileText />, label: 'DCI', subItems: [
      { path: '/dci/upload', icon: <FiPlus />, label: 'Upload' }
    ]}
  ];

  const adminNavItems = "currentUser"? [
  // const adminNavItems = currentUser?.role === 'admin' ? [
    { path: '/admin/users', icon: <FiUsers />, label: 'Users' },
    { path: '/admin/roles', icon: <FiUsers />, label: 'Roles' },
    { path: '/admin/settings', icon: <FiSettings />, label: 'Settings' }
  ] : [];

  const renderNavItem = (item) => (
    <li key={item.path} className="nav-item">
      <NavLink 
        to={item.path} 
        className={({ isActive }) => 
          `nav-link ${isActive ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`
        }
      >
        <span className="nav-icon">{item.icon}</span>
        {!collapsed && (
          <>
            <span className="nav-label">{item.label}</span>
            {item.subItems && (
              <span className="submenu-toggle">
                {activePath.startsWith(item.path) ? <FiChevronDown /> : <FiChevronRight />}
              </span>
            )}
          </>
        )}
      </NavLink>
      
      {item.subItems && !collapsed && (
        <ul className={`submenu ${activePath.startsWith(item.path) ? 'open' : ''}`}>
          {item.subItems.map(subItem => (
            <li key={subItem.path}>
              <NavLink 
                to={subItem.path}
                className={({ isActive }) => 
                  `submenu-link ${isActive ? 'active' : ''}`
                }
              >
                <span className="submenu-icon">{subItem.icon}</span>
                <span className="submenu-label">{subItem.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && <h3>Engineering DMS</h3>}
        <button 
          className="collapse-toggle"
          onClick={toggleSidebar}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-items">
          {mainNavItems.map(renderNavItem)}
        </ul>
        
        {adminNavItems.length > 0 && (
          <div className="admin-section">
            {!collapsed && <h4 className="section-title">Admin</h4>}
            <ul className="nav-items">
              {adminNavItems.map(renderNavItem)}
            </ul>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;