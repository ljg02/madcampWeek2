const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // 데이터베이스 연결을 위한 db.js 임포트
require('dotenv').config();

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
const enrollsRouter = require('./routes/enrolls');
const videosRouter = require('./routes/videos');
const commentsRouter = require('./routes/comments');
const tttRouter = require('./routes/ttt');
const mockRouter = require('./routes/mockexam');

app.use('/api/courses', coursesRouter);
app.use('/api/instructors', instructorsRouter);
app.use('/api/textbooks', textbooksRouter);
app.use('/api/auth', authRouter);
app.use('/api/enrolls', enrollsRouter);
app.use('/api/videos', videosRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/ttt', tttRouter);
app.use('/api/mockexam', mockRouter);


// 환경 변수
const PORT = process.env.PORT || 5001;

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