import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
      axios.get('http://localhost:5000/testUsers')
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
    <div>
      <h1>Home Page</h1>
      <button onClick={goToVideoPlayer}>Go to Video Player</button>
      <ul>
          {users.map((user) => (
          <li key={user.id}>
              {user.name} / {user.age}
          </li>
          ))}
      </ul>
    </div>
  );
}

export default Home;
