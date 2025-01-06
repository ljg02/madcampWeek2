// src/components/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // toast import

// AuthContext 생성
export const AuthContext = createContext();

// AuthProvider 컴포넌트 생성
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    isAuthenticated: false,
    user: null, // 사용자 정보가 있다면 추가
  });

  // 컴포넌트가 마운트될 때 localStorage에서 토큰과 사용자 정보를 읽어옴
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user'); // 사용자 정보는 JSON 문자열로 저장
    if (token && user && user !== 'undefined') {
      try {
        const parsedUser = JSON.parse(user);
        setAuth({
          token,
          isAuthenticated: true, // 로그인 상태를 true로 설정
          user: parsedUser, // 파싱된 사용자 정보 설정
        });
      } catch (error) {
        console.error('사용자 정보 파싱 오류:', error);
        // 파싱 오류 시 localStorage에서 user 제거
        localStorage.removeItem('user');
      }
      // 추가적으로 사용자 정보를 로드하는 API 호출 가능
    }
  }, []);

  // 로그인 함수
  const login = (token, user) => {
    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); // 사용자 정보 저장
      setAuth({
        token,
        isAuthenticated: true,
        user, // 사용자 정보 설정
      });
      toast.success('로그인 성공!');
    } else {
      toast.error('로그인 정보가 유효하지 않습니다.');
    }
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // 사용자 정보 제거
    setAuth({
      token: null,
      isAuthenticated: false,
      user: null,
    });
    toast.success('로그아웃 성공!');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
