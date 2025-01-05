const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library'); // Google Auth 라이브러리 import

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

// MySQL 데이터베이스 연결
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
    process.exit(1);
  } else {
    console.log('MySQL 연결 성공!');
  }
});

// 환경 변수
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';
const PORT = process.env.PORT || 5001;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

// Google OAuth 클라이언트 초기화
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// 테스트 API
app.get('/api/test', (req, res) => {
    db.query('SELECT 1 + 1 AS solution', (err, results) => {
        if (err) {
            res.status(500).send('Database query error');
        } else {
            res.json(results[0]);
        }
    });
});

// 프론트엔드 쿼리 테스트
app.get('/testUsers', (req, res) => {
    db.query('SELECT * FROM testUsers', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('서버 오류');
        } else {
            res.json(results);
        }
    });
});

// 회원가입 엔드포인트
app.post('/api/auth/register', async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ success: false, message: '이메일, 이름, 비밀번호를 모두 입력하세요.' });
  }

  try {
    // 1. 데이터베이스에서 email 중복 확인
    const checkQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkQuery, [email], async (err, results) => {
        //디버깅 코드 추가
        //console.log(`check for email: ${email}`);
        //console.log('Query Results:', results);

        if (err) {
        //console.error('데이터베이스 오류:', err);
        return res.status(500).json({ success: false, message: '서버 오류.' });
        }

        if (results.length > 0) {
        return res.status(400).json({ success: false, message: '이미 사용 중인 이메일입니다.' });
        }

        // 2. 비밀번호 암호화
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. 새로운 사용자 삽입
        //디버깅 코드 추가
        //console.log(`register attempt for email: ${email}`);
        //console.log('Query Results:', results);
        const insertQuery = 'INSERT INTO users (email, password, name, googleId) VALUES (?, ?, ?, ?)';
        db.query(insertQuery, [email, hashedPassword, name, 'NULL'], (err, results) => {
        if (err) {
            console.error('데이터베이스 삽입 오류:', err);
            return res.status(500).json({ success: false, message: '서버 오류.' });
        }

        res.status(201).json({ success: true, message: '회원가입 성공!' });
        });
    });
  } catch (error) {
    console.error('회원가입 에러:', error);
    res.status(500).json({ success: false, message: '서버 오류.' });
  }
});

// 로그인 엔드포인트
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: '이메일과 비밀번호를 입력하세요.' });
  }

  // 데이터베이스에서 사용자 조회
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: '데이터베이스 오류.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
    }

    const user = results[0];

    if (user.googleId !== 'NULL') {
      return res.status(400).json({ success: false, message: '이 이메일은 소셜 계정으로 등록되었습니다. 구글 로그인을 이용해주세요.' });
    }

    // 비밀번호 검증
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: '비밀번호가 올바르지 않습니다.' });
    }

    // JWT 생성
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ success: true, message: '로그인 성공!', token });
  });
});

// Google 로그인 엔드포인트
app.post('/api/auth/google-login', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, message: '인증 토큰이 필요합니다.' });
  }

  try {
    // Google 토큰 검증
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub } = payload; // sub: Google의 고유 사용자 ID

    if (!email) {
      return res.status(400).json({ success: false, message: '이메일을 가져올 수 없습니다.' });
    }

    // 데이터베이스에서 사용자 조회
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error('데이터베이스 오류:', err);
        return res.status(500).json({ success: false, message: '서버 오류.' });
      }

      let user = results[0];

      if (!user) {
        // 사용자가 없으면 새로 생성
        const insertQuery = 'INSERT INTO users (email, name, googleId) VALUES (?, ?, ?)';
        db.query(insertQuery, [email, name, sub], (err, results) => {
          if (err) {
            console.error('사용자 생성 오류:', err);
            return res.status(500).json({ success: false, message: '서버 오류.' });
          }

          // 새로 생성된 사용자 정보 조회
          const newUserId = results.insertId;
          const newUser = { id: newUserId, email, name, googleId: sub };

          // JWT 생성
          const jwtToken = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });
          res.status(201).json({
            success: true,
            message: '구글 로그인 성공!',
            token: jwtToken,
            user: {
              id: newUser.id,
              email: newUser.email,
              name: newUser.name,
            },
          });
        });
      } else {
        // 기존 사용자라면, 구글로 등록된 계정인지 확인
        if (user.googleId === 'NULL') {
          return res.status(400).json({ success: false, message: '이 이메일은 소셜 계정이 아닙니다. 이메일/비밀번호 로그인을 이용해주세요.' });
        }

        // JWT 생성
        const jwtToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
          success: true,
          message: '구글 로그인 성공!',
          token: jwtToken,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
        });
      }
    });
  } catch (error) {
    console.error('Google 로그인 에러:', error);
    res.status(401).json({ success: false, message: '유효하지 않은 구글 토큰입니다.' });
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 실행 중: http://localhost:${PORT}`);
});

{/* 강의 목록 조회 엔드포인트 */}
app.get('/api/availableCourses', async (req, res) => {
  try {
    const checkQuery = 'SELECT * FROM courses';
    db.query(checkQuery, (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('서버 오류');
      } else {
          res.json(results);
      }
  });
  } catch (error) {
    console.error('강좌 목록 조회 에러', error);
    res.status(500).json({ success: false, message: '서버 오류.' });
  }
});