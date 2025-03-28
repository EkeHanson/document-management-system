import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaRegFileAlt, 
  FaSearch, 
  FaBell, 
  FaUserCircle,
  FaChevronDown,
  FaSignOutAlt,
  FaCog,
  FaHome,
  FaProjectDiagram,
  FaFileUpload,
  FaFileDownload,
  FaHistory,
  FaUsersCog,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ onSidebarToggle, isSidebarCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState('');

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const handleLogout = () => {
    // logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const mainNavItems = [
    { path: '/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { path: '/projects', icon: <FaProjectDiagram />, label: 'Projects' },
    { path: '/documents', icon: <FaRegFileAlt />, label: 'Documents' },
    { path: '/transmittals', icon: <FaFileUpload />, label: 'Transmittals' },
    { path: '/reports', icon: <FaFileDownload />, label: 'Reports' }
  ];

  const adminNavItems = "currentUser" ? [
    { path: '/admin/users', icon: <FaUsersCog />, label: 'Users' },
    { path: '/admin/settings', icon: <FaCog />, label: 'Settings' }
  ] : [];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Sidebar Toggle Button */}
        <button 
          className="sidebar-toggle"
          onClick={onSidebarToggle}
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isSidebarCollapsed ? <FaBars /> : <FaTimes />}
        </button>

        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <FaRegFileAlt className="brand-icon" />
          <span className="brand-text">EngineeringDMS</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle mobile menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Main Navigation */}
        <div className={`navbar-main ${isMobileMenuOpen ? 'open' : ''}`}>
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="navbar-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search documents, projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search documents and projects"
            />
          </form>

          {/* Primary Navigation */}
          <ul className="navbar-links">
            {mainNavItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`navbar-link ${activePath.startsWith(item.path) ? 'active' : ''}`}
                  aria-current={activePath.startsWith(item.path) ? "page" : undefined}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* User Controls */}
        <div className="navbar-controls">
          {/* Notifications */}
          <button 
            className="notification-btn"
            aria-label="Notifications"
          >
            <FaBell />
            <span className="notification-badge">3</span>
          </button>

          {/* User Profile */}
          <div className="profile-dropdown">
            <button 
              className="profile-btn"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              aria-expanded={isProfileOpen}
              aria-label="User profile menu"
            >
              <FaUserCircle className="profile-icon" />
              <span className="profile-name">
                {'User'}
                <FaChevronDown className={`dropdown-arrow ${isProfileOpen ? 'open' : ''}`} />
              </span>
            </button>

            {isProfileOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <FaUserCircle className="user-icon" />
                  <div>
                    <div className="user-name">User</div>
                    <div className="user-role">Guest</div>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <Link to="/profile" className="dropdown-item">
                  <FaUserCircle /> My Profile
                </Link>
                <Link to="/settings" className="dropdown-item">
                  <FaCog /> Settings
                </Link>
                {adminNavItems.map((item) => (
                  <Link key={item.path} to={item.path} className="dropdown-item">
                    {item.icon} {item.label}
                  </Link>
                ))}
                <div className="dropdown-divider"></div>
                <button onClick={handleLogout} className="dropdown-item">
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;