// src/App.js
import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import "./App.css";

// 컴포넌트 import
import Sidebar from './components/Sidebar';
import Header from './components/Header'; // Header 컴포넌트 import
import Home from './pages/Home';
import VideoPlayer from './pages/VideoPlayer';
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import PrivateRoute from './components/PrivateRoute'; // PrivateRoute 컴포넌트 생성 필요

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 상태 관리

  // 사이드바 열기/닫기 함수
  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
    console.log("bar click");
  };

  return (
    <div className="app">
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} />

      <div className="mainBody">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/videoPlayer"
              element={
                <PrivateRoute>
                  <VideoPlayer />
                </PrivateRoute>
              }
            />
            <Route path="/calendar" element={<Calendar />} />
            {/* 추가적인 라우트 */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
