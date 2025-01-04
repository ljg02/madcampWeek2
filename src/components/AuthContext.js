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

  // 컴포넌트가 마운트될 때 localStorage에서 토큰을 읽어옴
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth({
        token,
        isAuthenticated: false,
        user: null, // 필요시 사용자 정보 로드
      });
      // 추가적으로 사용자 정보를 로드하는 API 호출 가능
    }
  }, []);

  // 로그인 함수
  const login = (token, user) => {
    localStorage.setItem('token', token);
    setAuth({
      token,
      isAuthenticated: true,
      user, // 사용자 정보 설정
    });
    toast.success('로그인 성공!');
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem('token');
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
