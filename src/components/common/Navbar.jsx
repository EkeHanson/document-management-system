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
  FaUsersCog
} from 'react-icons/fa';
// import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
 // const { currentUser, logout } = useAuth();
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
    logout();
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

  // const adminNavItems = currentUser?.role === 'admin' ? [
  const adminNavItems = "currentUser" ? [
    { path: '/admin/users', icon: <FaUsersCog />, label: 'Users' },
    { path: '/admin/settings', icon: <FaCog />, label: 'Settings' }
  ] : [];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <FaRegFileAlt className="brand-icon" />
          <span className="brand-text">EngineeringDMS</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
            />
          </form>

          {/* Primary Navigation */}
          <ul className="navbar-links">
            {mainNavItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`navbar-link ${activePath.startsWith(item.path) ? 'active' : ''}`}
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
          <button className="notification-btn">
            <FaBell />
            <span className="notification-badge">3</span>
          </button>

          {/* User Profile */}
          <div className="profile-dropdown">
            <button 
              className="profile-btn"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <FaUserCircle className="profile-icon" />
              <span className="profile-name">
                { 'User'}
                {/* {currentUser?.name || 'User'} */}
                <FaChevronDown className={`dropdown-arrow ${isProfileOpen ? 'open' : ''}`} />
              </span>
            </button>

            {isProfileOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <FaUserCircle className="user-icon" />
                  <div>
                    <div className="user-name">{currentUser?.name || 'User'}</div>
                    <div className="user-role">{currentUser?.role || 'Guest'}</div>
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