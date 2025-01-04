const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

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
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: '이메일과 비밀번호를 입력하세요.' });
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
        const insertQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.query(insertQuery, [email, hashedPassword], (err, results) => {
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

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 실행 중: http://localhost:${PORT}`);
});
