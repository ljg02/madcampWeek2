// pages/Mypage.jsx
import React from 'react';

const Mypage = () => {
    return (
        <div className="container">
            {/* Header Section */}
            <div className="header">
                <span>2026 대학수학능력시험</span>
                <span className="countdown">2025/11/13 | 03월 05시간 58분 33초</span>
            </div>

            {/* Main Section */}
            <div className="main-content">
                {/* Today's Lecture Section */}
                <div className="lecture-section">
                    <h2>Today's Lecture</h2>
                    <div className="lecture-cards">
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                    </div>
                    <button className="next-btn">{`>`}</button>
                </div>

                {/* Today's Time Table Section */}
                <div className="timetable-section">
                    <h3>Today's Time Table</h3>
                    <div className="timetable-placeholder"></div>
                </div>
            </div>

            {/* Progress Section */}
            <div className="progress-section">
                <div className="progress-circle"></div>
                <button className="progress-btn">강의 진행률</button>
                <button className="progress-btn">공부 시간 분석</button>
                <button className="progress-btn">-의 한 마디</button>
                <p>하루 평균 ~시간 공부했습니다</p>
                <p>잘 하고 있어! 조금 더 분발하자!</p>
                <input type="range" className="progress-bar" />
            </div>

            {/* Footer Section */}
            <div className="footer">
                <p>고객센터 공지사항 | [보기]</p>
                <p>© 2026 All Rights Reserved.</p>
                <p>개인정보처리방침 | 이용약관 | 사이트맵 | 찾아오시는길</p>
            </div>
        </div>
    );
};

export default Mypage;
