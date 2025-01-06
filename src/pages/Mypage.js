import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Mypage.css";

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
    <div className="mypage-container">
      <div className="left-container">
        {/* 수강 중인 강의, 강의 진행률, 공부시간 분석, 피드백 */}
        <div className="lecture-container">
          <div className="lectures">
            <div className="overlap-group">
              <div className="text-wrapper">Today’s Lectures</div>
            </div>
          </div>
          <div className="schedule">
            <div className="text1">
              <div className="text-wrapper">강의 진행률</div>
            </div>
            <div className="text2">
              <div className="text-wrapper">공부시간분석</div>
            </div>
            <div className="text3">
              <div className="text-wrapper">피드백</div>
            </div>
            <div className="rectangle2">
              <p className="text-wrapper-2">하루 평균 ~시간 공부했습니다</p>
            </div>
            <div className="rectangle3">
              <p className="text-wrapper-2">잘 하고 있어 조금 더 분발하자 !</p>
            </div>
          </div>
        </div>
      </div>
      <div className="time-table-container">
        {/* 오늘의 시간표를 가장 오른쪽에 배치 */}
        <div className="time-table">
          <div className="overlap-group">
            <div className="text-wrapper">Today’s Time Table</div>
          </div>
          <div className="rectangle" />
        </div>
      </div>
    </div>
  );
}

export default Mypage;
