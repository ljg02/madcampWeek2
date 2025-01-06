// server/db.js
const mysql = require('mysql2');
require('dotenv').config();

// MySQL 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST,       // 예: 'localhost'
  user: process.env.DB_USER,       // 예: 'root'
  password: process.env.DB_PASSWORD, // 예: 'password'
  database: process.env.DB_NAME,     // 예: 'your_database'
});

// 데이터베이스 연결
db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
    process.exit(1); // 연결 실패 시 서버 종료
  } else {
    console.log('MySQL 연결 성공!');
  }
});

// 모듈로 내보내기
module.exports = db;
