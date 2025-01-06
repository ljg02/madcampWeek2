// src/components/Sidebar/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
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
          <li className={location.pathname === '/lecture-all-frame' ? 'active' : ''}>
            <Link to="/lecture" onClick={toggleSidebar}>Lecture</Link>
          </li>
          <li className={location.pathname === '/mypage' ? 'active' : ''}>
            <Link to="/mypage" onClick={toggleSidebar}>Mypage</Link>
            </li>
          <li className={location.pathname === '/mypage-lecture' ? 'active' : ''}>
            <Link to="/mypage-lecture" onClick={toggleSidebar}>MypageLecture</Link>
          </li>
          <li className={location.pathname === '/mypage-schedule' ? 'active' : ''}>
            <Link to="/mypage-schedule" onClick={toggleSidebar}>MypageSchedule</Link>
          </li>
          <li className={location.pathname === '/mypage-notes' ? 'active' : ''}>
            <Link to="/mypage-notes" onClick={toggleSidebar}>MypageNotes</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
