const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // 데이터베이스 연결을 위한 db.js 임포트
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library'); // Google Auth 라이브러리 import

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

//라우터 연결
const coursesRouter = require('./routes/courses');
const instructorsRouter = require('./routes/instructors');
const textbooksRouter = require('./routes/textbooks');
const authRouter = require('./routes/auth');

app.use('/api/courses', coursesRouter);
app.use('/api/instructors', instructorsRouter);
app.use('/api/textbooks', textbooksRouter);
app.use('/api/auth', authRouter);


// 환경 변수
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';
const PORT = process.env.PORT || 5001;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

// Google OAuth 클라이언트 초기화
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// 테스트 API
app.get('/api/test', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS solution');
    res.json(rows[0]);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).send('Database query error');
  }
});

// 프론트엔드 쿼리 테스트
app.get('/testUsers', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM testUsers');
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('서버 오류');
  }
});

// 에러 핸들링 미들웨어 (라우터 연결 이후에 추가)
app.use((err, req, res, next) => {
  console.error('에러 발생:', err);
  res.status(500).json({ message: '서버 에러' });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 실행 중: http://localhost:${PORT}`);
});