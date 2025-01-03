// src/components/Sidebar/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <ul>
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/" onClick={toggleSidebar}>Home</Link>
        </li>
        <li className={location.pathname === '/login' ? 'active' : ''}>
          <Link to="/login" onClick={toggleSidebar}>Login</Link>
        </li>
        <li className={location.pathname === '/videoPlayer' ? 'active' : ''}>
          <Link to="/videoPlayer" onClick={toggleSidebar}>VideoPlayer</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
