import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Mypage.css";

function Mypage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // useNavigate 훅 사용

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
    navigate('/videoPlayer'); // 프로그래밍 방식으로 이동
  };

  return (
    // <div>
    //   <h1>Home Page</h1>
    //   <button onClick={goToVideoPlayer}>Go to Video Player</button>
    //   <ul>
    //       {users.map((user) => (
    //       <li key={user.id}>
    //           {user.name} / {user.age}
    //       </li>
    //       ))}
    //   </ul>
    // </div>
    <div className="mypage-container">
      <div className="lecture-container">
        {/* 오늘 강의 */}
        <div className="lectures">
          {/* <img className="vector" alt="Vector" src={vector} /> */}

          <div className="today">
            <div className="rectangle" />
          </div>

          <div className="rectangle-wrapper">
            <div className="rectangle" />
          </div>

          <div className="div-wrapper">
            <div className="rectangle" />
          </div>

          <div className="overlap-group">
            <div className="div" />

            <div className="text-wrapper">Today’s Lectures</div>
          </div>
        </div>
        {/* 스케줄 제안 */}
        <div className="schedule">
          {/* <img className="image" alt="Image" src={image} /> */}

          <div className="text1">
            <div className="text-wrapper">강의 진행률</div>
          </div>

          <div className="text2">
            <div className="text-wrapper">공부시간분석</div>
          </div>

          <div className="text3">
            <div className="text-wrapper">한 마디</div>
          </div>

          <div className="line-wrapper">
            {/* <img className="line" alt="Line" src={line1} /> */}
          </div>

          <div className="rectangle2">
            <p className="text-wrapper-2">하루 평균 ~시간 공부했습니다</p>
          </div>

          <div className="rectangle3">
            <p className="text-wrapper-2">잘 하고 있어 조금 더 분발하자 !</p>
          </div>
        </div>
      </div>

      <div className="time-table-container">
        {/* 시간표 */}
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
