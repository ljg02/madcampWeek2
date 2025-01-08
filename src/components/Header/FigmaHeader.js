import React, { useContext, useState, useEffect } from "react";
import "./FigmaHeader.css";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AuthContext } from "../AuthContext"; // AuthContext import
import logo from "./studyMateLogo.png";

export const Header = ({ toggleSidebar }) => {
  const { auth, logout } = useContext(AuthContext); // AuthContext 사용
  const navigate = useNavigate();
  const SUNEUNG_DATE = new Date("2025-11-13");
  const [dday, setDday] = useState(null);

  useEffect(() => {
    const today = new Date();
    // 수능 날짜 - 오늘 날짜 (밀리초 차이)
    const diff = SUNEUNG_DATE.getTime() - today.getTime();
    // 일(day) 단위로 변환
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

    setDday(diffDays);
  }, []);

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

  
  const handleHomeClick = async () => {
    navigate('/');
  };


  const handleLectureClick = async () => {
    navigate('/mypage-lecture');
  };

  const handleScheduleClick = async () => {
    navigate('/mypage-schedule');
  };

  const handleNoteClick = async () => {
    navigate('/mypage-notes');
  };

  return (
    <div className="header">
      <div className="overlap-group">
        {/* dday가 null이 아닐 때만 렌더링하거나, 디폴트로 0을 줘도 됩니다 */}
        <p className="d">
          <span className="text-wrapper">수능 </span>
          {/* D-day 표시 */}
          <span className="span">D-{dday ?? "..."}</span>
        </p>

        {auth.isAuthenticated ? (
          <p className="div" onClick={handleLogoutClick}>로그아웃</p>
        ) : (
            <p className="div" onClick={handleLoginClick}>로그인</p>
        )}
        {auth.isAuthenticated ? (
          <p className="user-name" onClick={handleProfileClick}> {auth.user.name} 님</p>
        ) : (
          <p className="item-link" onClick={handleRegisterClick}>회원가입</p>
        )}
      </div>

      {/* <img
        className="vertical-border"
        alt="Vertical border"
        src={verticalBorder}
      /> */}

      <div className="button" onClick={toggleSidebar} >
        <FaBars className="icon" />
      </div>

      <div className="item-link-2" onClick={handleHomeClick}>Home</div>

      <div className="item-link-3" onClick={handleLectureClick}>Lectures</div>

      <div className="item-link-4" onClick={handleScheduleClick}>Schedule</div>

      <div className="item-link-5" onClick={handleNoteClick}>Notes</div>


      {/* <div className="rectangle" /> */}

      <div className="mypage-text">오늘도 STUDYMATE와 함께 해요 !</div>


      <div className="overlap" onClick={handleProfileClick} >
      <img 
          className="profile-image" 
          // src="../../../assets/Lecture/mypage_ic.png"
          src = 'https://storage.googleapis.com/coursessss/mypage_ic.png'
          alt="mypage_ic" 
        />
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