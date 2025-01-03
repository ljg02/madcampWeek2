// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // 스타일링 파일 import
import { useNavigate } from 'react-router-dom'; // 페이지 전환을 위한 훅
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; // 아이콘 import

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // 페이지 전환을 위한 navigate 함수

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        setMessage('로그인 성공!');
        // JWT를 Local Storage에 저장
        localStorage.setItem('token', response.data.token);
        // 홈 페이지로 이동
        //navigate('/');
      } else {
        setMessage('로그인에 실패했습니다. 이메일이나 비밀번호를 확인해주세요.');
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      setMessage('서버 오류가 발생했습니다.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setMessage('모든 필드를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
      });

      if (response.data.success) {
        setMessage('회원가입 성공! 로그인 페이지로 전환됩니다.');
        setIsRegistering(false);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage('회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원가입 에러:', error);
      setMessage('서버 오류가 발생했습니다.');
    }
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setEmail('');
    setPassword('');
    setMessage('');
  };

  return (
    <div className="background">
      <div className="login-container">
        <h2>{isRegistering ? '회원가입' : '로그인'}</h2>
        <form
          onSubmit={isRegistering ? handleRegister : handleLogin}
          className={`login-form ${isRegistering ? 'register' : 'login'}`}
        >
          <div className="form-group">
            <label htmlFor="email">이메일:</label>
            <div className="input-with-icon">
              <FaEnvelope className="icon" />
              <input
                type="email"
                id="email"
                placeholder="예: user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호:</label>
            <div className="input-with-icon">
              <FaLock className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          {isRegistering && (
            <div className="form-group">
              <label htmlFor="confirmPassword">비밀번호 확인:</label>
              <div className="input-with-icon">
                <FaLock className="icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          )}
          <button type="submit" className="submit-button">
            {isRegistering ? '회원가입' : '로그인'}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        <button onClick={toggleForm} className="toggle-button">
          {isRegistering ? '로그인으로 돌아가기' : '회원가입'}
        </button>
      </div>
    </div>
  );
};

export default Login;
