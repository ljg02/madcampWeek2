// server/routes/textbooks.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Promise 기반 연결 풀 임포트

// 교재 목록 조회
router.get('/', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM textbooks');
    res.json(results);
  } catch (err) {
    console.error('교재 목록 조회 에러:', err);
    res.status(500).json({ success: false, message: '서버 오류.' });
  }
});

// 특정 교재의 상세 정보 가져오기
router.get('/:id', async (req, res) => {
  const textbookId = req.params.id;

  try {
    const [results] = await db.query('SELECT * FROM textbooks WHERE id = ?', [textbookId]);

    if (results.length === 0) {
      return res.status(404).json({ message: '교재를 찾을 수 없습니다.' });
    }

    const textbook = results[0];

    // 담당 교사 정보 가져오기
    const [teacherResults] = await db.query('SELECT * FROM teachers WHERE id = ?', [textbook.teacher_id]);

    const teacher = teacherResults.length > 0 ? teacherResults[0] : null;

    res.json({ textbook, teacher });
  } catch (err) {
    console.error('교재 상세 정보 요청 에러:', err);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

module.exports = router;
