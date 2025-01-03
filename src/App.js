// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import { FaBars, FaUserCircle, FaBell } from "react-icons/fa";
import { MdSettings } from "react-icons/md";

// 컴포넌트 import
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import VideoPlayer from './pages/VideoPlayer';
import Login from './pages/Login';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 상태 관리

  // 사이드바 열기/닫기 함수
  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <Router>
      <div className="app">
        {/* Header */}
        <header className="header">
          <div className="header__left">
            <FaBars className="icon" onClick={toggleSidebar} />
          </div>
          <div className="header__center">
            <span>Title</span>
          </div>
          <div className="header__right">
            <MdSettings className="icon" />
            <FaBell className="icon" />
            <FaUserCircle className="icon" />
          </div>
        </header>

        <div className="mainBody">
          {/* Sidebar */}
          <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

          {/* Main Content */}
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/videoPlayer" element={<VideoPlayer />} />
              <Route path="/login" element={<Login />} />
              {/* 추가적인 라우트 */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
