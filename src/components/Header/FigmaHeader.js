import React, { useContext } from "react";
import "./FigmaHeader.css";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AuthContext } from "../AuthContext"; // AuthContext import
import logo from "./studyMateLogo.png";

export const Header = ({ toggleSidebar }) => {
  const { auth, logout } = useContext(AuthContext); // AuthContext 사용
  const navigate = useNavigate();

  const handleLogoClick = async () => {
    navigate('/');
  };

  const handleLoginClick = async () => {
    navigate('/login', { state: { isRegistering: false } });
  };

  const handleLogoutClick = async () => {
      await logout();
      navigate('/');
  };

  const handleRegisterClick = async () => {
    navigate('/login', { state: { isRegistering: true } }); // isRegistering 상태 전달
  };

  const handleProfileClick = async () => {
    navigate('/mypage');
  };

  return (
    <div className="header">
      <div className="overlap-group">
        <p className="d">
          <span className="text-wrapper">수능 </span>

          <span className="span">D-314</span>
        </p>

        {auth.isAuthenticated ? (
          <p className="div" onClick={handleLogoutClick}>로그아웃</p>
        ) : (
            <p className="div" onClick={handleLoginClick}>로그인</p>
        )}
        <p className="item-link" onClick={handleRegisterClick}>회원가입</p>
      </div>

      {/* <img
        className="vertical-border"
        alt="Vertical border"
        src={verticalBorder}
      /> */}

      <div className="button" onClick={toggleSidebar} >
        <FaBars className="icon" />
      </div>

      <div className="item-link-2">Lectures</div>

      <div className="item-link-3">Schedule</div>

      <div className="item-link-4">Notes</div>

      <div className="item-link-5">Grades</div>

      <div className="rectangle" />

      <div className="overlap" onClick={handleProfileClick} >
        {/* <img
          className="material-symbols"
          alt="Material symbols"
          src={materialSymbolsHomeRounded}
        /> */}
      </div>

      <img className="logo" alt="Logo" src={logo} onClick={handleLogoClick}/>
    </div>
  );
};

export default Header;