import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './Loader.css'; // Optional styling file

const Layout = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content" style={{ marginLeft: '250px' }}> {/* Add marginLeft */}
        <Topbar />
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;