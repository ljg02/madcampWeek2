import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './components/AuthContext'; // AuthContext import
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'; // 스타일링 파일 import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
        <ToastContainer
          position="top-center" // 위치를 top-center로 설정
          autoClose={3000} // 자동으로 닫히는 시간 (밀리초)
          hideProgressBar={false} // 진행 막대 숨김 여부
          newestOnTop={false} // 새 Toast가 기존 Toast 위에 표시되지 않도록 설정
          draggable
        />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
