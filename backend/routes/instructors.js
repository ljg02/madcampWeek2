// server/routes/instructors.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Promise 기반 연결 풀 임포트

//전체 선생님 목록 가져오기
router.get('/', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM teachers');
    res.json(results);
  } catch (err) {
    console.error('선생님 목록 조회 에러', err);
    res.status(500).send({ success: false, message: '서버 오류.' });
  }
});

// 특정 선생님의 상세 정보 및 담당 강의들 가져오기
router.get('/:id', async (req, res) => {
  const instructorId = req.params.id;

  try {
    // 선생님 정보 가져오기
    const [instructorResults] = await db.query('SELECT * FROM teachers WHERE id = ?', [instructorId]);

    if (instructorResults.length === 0) {
      return res.status(404).json({ message: '선생님을 찾을 수 없습니다.' });
    }

    const instructor = instructorResults[0];

    // 강사가 담당하는 강좌들 가져오기
    const [coursesResults] = await db.query('SELECT * FROM courses WHERE teacher_id = ?', [instructorId]);

    res.json({ instructor, courses: coursesResults });
  } catch (err) {
    console.error('선생님 상세 정보 요청 에러:', err);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

module.exports = router;
