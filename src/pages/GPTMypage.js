// Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./GPTMypage.css";

function Mypage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/testUsers`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('데이터 요청 실패:', error);
      });
  }, []);

  const goToVideoPlayer = () => {
    navigate('/videoPlayer');
  };

  return (
    <div className="home-container">
      <section className="courses-section">
      <h2>수강 중인 강의</h2>
      <div className="courses">
          {users.map((user) => (
          <div key={user.id} className="course-card">
              <h3>{user.name}</h3>
              <p>나이: {user.age}</p>
          </div>
          ))}
          <button className="video-button" onClick={goToVideoPlayer}>비디오 플레이어로 이동</button>
      </div>
      </section>

      <section className="timetable-section">
      <h2>오늘의 시간표</h2>
      <div className="timetable">
          {/* 시간표 내용을 여기에 추가 */}
          <p>시간표 내용이 여기에 표시됩니다.</p>
      </div>
      </section>

      <section className="analytics-section">
      <div className="analytics-card">
          <h3>강의 진행률</h3>
          <div className="progress-bar">
          <div className="progress" style={{ width: '70%' }}></div>
          </div>
          <p>70% 완료</p>
      </div>
      <div className="analytics-card">
          <h3>공부 시간 분석</h3>
          <p>하루 평균 3시간 공부했습니다.</p>
      </div>
      <div className="analytics-card">
          <h3>피드백</h3>
          <p>잘 하고 있어요! 조금 더 분발해봐요!</p>
      </div>
      </section>
    </div>
  );
}

export default Mypage;
