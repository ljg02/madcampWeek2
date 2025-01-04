import React from "react";
import "./FigmaHeader.css";
import { FaBars } from "react-icons/fa";
import logo from "./studyMateLogo.png"

export const Header = ({ toggleSidebar }) => {
  return (
    <div className="header">
      <div className="overlap-group">
        <p className="d">
          <span className="text-wrapper">수능 </span>

          <span className="span">D-314</span>
        </p>

        <div className="list">
          <div className="item-link">회원가입</div>
        </div>

        <div className="div">로그인</div>
      </div>

      {/* <img
        className="vertical-border"
        alt="Vertical border"
        src={verticalBorder}
      /> */}

      <div className="button">
        <FaBars className="icon" onClick={toggleSidebar} />
      </div>

      <div className="item-link-2">Lectures</div>

      <div className="item-link-3">Schedule</div>

      <div className="item-link-4">Notes</div>

      <div className="item-link-5">Grades</div>

      <div className="rectangle" />

      <div className="overlap">
        {/* <img
          className="material-symbols"
          alt="Material symbols"
          src={materialSymbolsHomeRounded}
        /> */}
      </div>

      <img className="logo" alt="Logo" src={logo} />
    </div>
  );
};

export default Header;