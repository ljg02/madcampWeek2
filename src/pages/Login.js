// src/components/Login.js
import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import './Login.css'; // 스타일링 파일 import
import { useNavigate, useLocation } from 'react-router-dom'; // 페이지 전환을 위한 훅
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; // 아이콘 import
import { MdDriveFileRenameOutline } from "react-icons/md";
import { AuthContext } from '../components/AuthContext'; // AuthContext import
import { toast } from 'react-toastify'; // toast import
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // 토큰 디코딩을 위한 라이브러리

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // 페이지 전환을 위한 navigate 함수
  const location = useLocation();

  const { auth, login } = useContext(AuthContext); // AuthContext에서 login 함수 사용

  const hasShownMessage = useRef(false); // 메시지 중복 출력 방지를 위한 ref

  // 인증 상태에 따라 홈 페이지로 리다이렉트
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/');
    }
  }, [auth, navigate]);

  // 리다이렉트 시 전달된 메시지 처리
  useEffect(() => {
    if (location.state && location.state.message && !hasShownMessage.current) {
      toast.info(location.state.message); // 알림 배너로 메시지 표시
      hasShownMessage.current = true; //메시지가 한번 표시되었음을 기록
    }
    if (location.state && location.state.isRegistering) {
      setIsRegistering(location.state.isRegistering); // isRegistering 상태 설정
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });

      if (response.data.success) {
        // JWT를 Local Storage에 저장하고 AuthContext 업데이트
        await login(response.data.token, response.data.user); // user 정보가 있다면 전달
        // 홈 페이지로 이동
        navigate('/');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      // 백엔드가 오류 응답을 보냈는지 확인
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('서버 오류가 발생했습니다.');
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !name || !password || !confirmPassword) {
      setMessage('모든 필드를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
        email,
        name,
        password,
      });

      if (response.data.success) {
        toast.success('회원가입 성공! 로그인 페이지로 전환됩니다.');
        setIsRegistering(false);
        setEmail('');
        setName('');
        setPassword('');
        setConfirmPassword('');
        setMessage('');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('회원가입 에러:', error);
      // 백엔드가 오류 응답을 보냈는지 확인
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('서버 오류가 발생했습니다.');
      }
    }
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setEmail('');
    setName('');
    setPassword('');
    setConfirmPassword('');
    setMessage('');
  };

  // Google 로그인 성공 핸들러
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse; // Google에서 받은 JWT 토큰
      const decoded = jwtDecode(credential); // 토큰 디코딩 
      console.log(decoded);

      // 백엔드로 토큰 전송하여 인증
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/google-login`, {
        token: credential,
      });

      setEmail('');
      setName('');
      setPassword('');
      setConfirmPassword('');
      setMessage('');
      if (response.data.success) {
        await login(response.data.token, response.data.user);
        navigate('/');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Google 로그인 에러:', error);
      setMessage('Google 로그인 중 오류가 발생했습니다.');
      setEmail('');
      setName('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  // Google 로그인 실패 핸들러
  const handleGoogleLoginError = () => {
    console.error('Google 로그인 실패');
    setMessage('Google 로그인이 실패했습니다.');
    setEmail('');
    setName('');
    setPassword('');
    setConfirmPassword('');
    setMessage('');
  };

  return (
    <div className="background">
      <div className={`login-container ${isRegistering ? 'extend' : ''}`}>
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
          {/* 이름 입력 칸 */}
          {isRegistering && (
            <div className="form-group">
              <label htmlFor="name">이름:</label>
              <div className="input-with-icon">
                <MdDriveFileRenameOutline className="icon" />
                <input
                  type="text"
                  id="name"
                  placeholder="이름을 입력하세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}
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
        <div className="google-login">
          <p>구글 계정으로 로그인:</p>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
            width='300px'
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
