import React from "react";
import { FaBars } from "react-icons/fa";
import "./FigmaHeader.css";
//import verticalBorder from "./vertical-border.svg";

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

        {/* <img
          className="vertical-border"
          alt="Vertical border"
          src={verticalBorder}
        /> */}

        <FaBars className="sideBarButton" onClick={toggleSidebar} />

        <div className="item-link-2">선생님</div>

        <div className="item-link-3">STUDYMATE</div>

        <div className="item-link-4">모의고사</div>

        <div className="item-link-5">입시정보</div>

        <div className="item-link-6">BOOKSTORE</div>

        <div className="item-link-wrapper">
          <div className="item-link-7">
            <div className="background">
              <div className="text-wrapper-2">1/6(월) 마감</div>
            </div>

            <div className="text-wrapper-3">2026 ~~패스</div>
          </div>
        </div>

        <div className="image-background" />

        <div className="rectangle" />

        <div className="rectangle-2" />

        <div className="ellipse" />

        <div className="ellipse-2" />
      </div>
    </div>
  );
};

export default Header;
