// server/routes/instructors.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Promise 기반 연결 풀 임포트

// 특정 강사의 상세 정보 및 담당 과목들 가져오기
router.get('/:id', async (req, res) => {
  const instructorId = req.params.id;

  try {
    // 강사 정보 가져오기
    const [instructorResults] = await db.query('SELECT * FROM teachers WHERE id = ?', [instructorId]);

    if (instructorResults.length === 0) {
      return res.status(404).json({ message: '강사를 찾을 수 없습니다.' });
    }

    const instructor = instructorResults[0];

    // 강사가 담당하는 과목들 가져오기
    const [coursesResults] = await db.query('SELECT * FROM courses WHERE teacher_id = ?', [instructorId]);

    res.json({ instructor, courses: coursesResults });
  } catch (err) {
    console.error('강사 상세 정보 요청 에러:', err);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

module.exports = router;
