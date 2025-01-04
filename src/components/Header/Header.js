// src/components/Header.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaUserCircle, FaBell } from "react-icons/fa";
import { MdSettings, MdLogin, MdLogout } from "react-icons/md";
import { AuthContext } from "../AuthContext"; // AuthContext import
import "./Header.css";

const Header = ({ toggleSidebar }) => {
  const { auth, logout } = useContext(AuthContext); // AuthContext 사용
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    navigate('/login');
  };

  const handleLogoutClick = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header__left">
        <FaBars className="icon" onClick={toggleSidebar} />
      </div>
      <div className="header__center">
        <span>Title</span>
      </div>
      <div className="header__right">
        {auth.isAuthenticated ? (
          <>
            <span> 로그인 상태 </span>
            <MdLogout className="icon" onClick={handleLogoutClick} />
            <MdSettings className="icon" />
            <FaBell className="icon" />
            <FaUserCircle className="icon" />
          </>
        ) : (
          <>
            <span> 비로그인 상태 </span>
            <MdLogin className="icon" onClick={handleLoginClick} />
            <MdSettings className="icon" />
            <FaBell className="icon" />
            <FaUserCircle className="icon" />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
