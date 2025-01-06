// server/routes/courses.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Promise 기반 연결 풀 임포트

// 특정 과목의 상세 정보 및 담당 교사 정보 가져오기
router.get('/:id', async (req, res, next) => {
  const courseId = req.params.id;

  try {
    // 과목 정보 가져오기
    const [courseResults] = await db.query('SELECT * FROM courses WHERE id = ?', [courseId]);

    if (courseResults.length === 0) {
      return res.status(404).json({ message: '과목을 찾을 수 없습니다.' });
    }

    const course = courseResults[0];

    // 담당 교사 정보 가져오기
    const [teacherResults] = await db.query('SELECT * FROM teachers WHERE id = ?', [course.teacher_id]);

    const teacher = teacherResults.length > 0 ? teacherResults[0] : null;

    res.json({ course, teacher });
  } catch (err) {
    console.error('과목 상세 정보 요청 에러:', err);
    next(err); // 에러 핸들링 미들웨어로 전달
  }
});

module.exports = router;
