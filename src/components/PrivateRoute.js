// src/components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // AuthContext import

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  return auth.isAuthenticated ? children : <Navigate to="/login" state={{ from: location, message: '로그인이 필요한 서비스입니다.' }} replace />;
};

export default PrivateRoute;
