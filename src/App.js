// src/App.js
import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import "./App.css";

// 컴포넌트 import
import Sidebar from './components/Sidebar';
import Header from './components/Header'; // Header 컴포넌트 import
import Footer from "./components/Footer";
import Home from './pages/Home/Home';
import VideoPlayer from './pages/VideoPlayer';
import Login from './pages/Login/Login';
import Lecture from './pages/Lecture';
import MypageLecture from './pages/MypageLecture';
import MypageSchedule from './pages/MypageSchedule';
import MypageNotes from './pages/MypageNotes';
import PrivateRoute from './components/PrivateRoute'; // PrivateRoute 컴포넌트 생성 필요
import Mypage from './pages/Mypage/GPTMypage';
import CourseDetail from './pages/CourseDetail/CourseDetail';
import InstructorDetail from './pages/InstructorDetail/InstructorDetail';
import TextbookDetail from './pages/TextbookDetail/TextbookDetail';
import MockExamDetail from './pages/MockExamDetail/MockExamDetail';
import VideoDetail from './pages/VideoDetail/VideoDetail';

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
        <div
          className={`overlay ${isSidebarOpen ? "open" : ""}`}
          onClick={toggleSidebar}
        ></div>

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
            <Route
              path="/mypage-lecture"
              element={
                <PrivateRoute>
                  <MypageLecture />
                </PrivateRoute>
              }
            />
            <Route path="/mypage-schedule" element={<MypageSchedule />} />
            <Route path="/mypage-notes" element={<MypageNotes />} />
            <Route
              path="/mypage"
              element={
                <PrivateRoute>
                  <Mypage />
                </PrivateRoute>
              }
            />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/instructor/:id" element={<InstructorDetail />} />
            <Route path="/textbook/:id" element={<TextbookDetail />} />
            <Route path="/mockExam/:id" element={<MockExamDetail />} />
            <Route path="/video/:id" element={<VideoDetail />} />
            {/* 추가적인 라우트 */}
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;