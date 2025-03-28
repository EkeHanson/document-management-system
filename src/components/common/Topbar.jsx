import React from 'react';
// import { useAuth } from '../contexts/AuthContext';
import { FiBell, FiSearch, FiUser } from 'react-icons/fi';

const Topbar = () => {
  // const { currentUser } = useAuth();

  return (
    <div className="topbar">
      <div className="topbar-search">
        <FiSearch className="search-icon" />
        <input type="text" placeholder="Search documents, projects..." />
      </div>
      
      <div className="topbar-right">
        <button className="notification-btn">
          <FiBell />
          <span className="notification-badge">3</span>
        </button>
        
        <div className="user-profile">
          <div className="avatar">
            {"currentUser"?.avatar ? (
              <img src={currentUser.avatar} alt={currentUser.name} />
            ) : (
              <FiUser />
            )}
          </div>
          <div className="user-info">
            <span className="user-name">{'User'}</span>
            <span className="user-role">{ 'Guest'}</span>
            {/* <span className="user-name">{currentUser?.name || 'User'}</span>
            <span className="user-role">{currentUser?.role || 'Guest'}</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;