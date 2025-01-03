import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./App.css";
import { FaSearch, FaBars, FaUserCircle, FaBell } from "react-icons/fa";
import { MdSettings } from "react-icons/md"

import Player from './page/player';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 상태 관리
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('데이터 요청 실패:', error);
      });
  }, []);

  // 사이드바 열기/닫기 함수
  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header__left">
          <FaBars className="icon" onClick={toggleSidebar} />
        </div>
        <div className="header__center">
          <span>Title</span>
          {/* <input type="text" placeholder="Search" className="search-bar" />
          <button className="search-button">
            <FaSearch />
          </button> */}
        </div>
        <div className="header__right">
          <MdSettings className="icon" />
          <FaBell className="icon" />
        </div>
      </header>

      <div className="mainBody">
        {/* Sidebar */}
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/trending">Trending</a></li>
            <li><a href="/subscriptions">Subscriptions</a></li>
            <li>Library</li>
            <li>History</li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* <h>Course Title</h> */}
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name} / {user.age}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
