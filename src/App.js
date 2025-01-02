import React from "react";
import "./App.css";
import { FaSearch, FaBars, FaUserCircle, FaVideo, FaBell } from "react-icons/fa";

const App = () => {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header__left">
          <FaBars className="icon" />
          <img
            src="https://www.youtube.com/img/desktop/yt_1200.png"
            alt="YouTube Logo"
            className="logo"
          />
        </div>
        <div className="header__center">
          <input type="text" placeholder="Search" className="search-bar" />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>
        <div className="header__right">
          <FaVideo className="icon" />
          <FaBell className="icon" />
          <FaUserCircle className="icon" />
        </div>
      </header>

      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li>Home</li>
          <li>Trending</li>
          <li>Subscriptions</li>
          <li>Library</li>
          <li>History</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="video-card">
          <img
            src="https://via.placeholder.com/320x180"
            alt="Thumbnail"
            className="thumbnail"
          />
          <div className="video-info">
            <img
              src="https://via.placeholder.com/36"
              alt="Channel Icon"
              className="channel-icon"
            />
            <div className="video-text">
              <h4>Video Title</h4>
              <p>Channel Name</p>
              <p>1M views • 1 day ago</p>
            </div>
          </div>
        </div>
        {/* Add more video cards here */}
      </div>
    </div>
  );
};

export default App;
