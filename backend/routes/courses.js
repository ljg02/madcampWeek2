// server/routes/courses.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // 데이터베이스 연결 모듈

// 특정 과목의 상세 정보 및 담당 교사 정보 가져오기
router.get('/:id', async (req, res) => {
  const courseId = req.params.id;

  try {
    // 과목 정보 가져오기
    const courseResult = await db.query('SELECT * FROM course WHERE id = ?', [courseId]);

    if (courseResult.length === 0) {
      return res.status(404).json({ message: '과목을 찾을 수 없습니다.' });
    }

    const course = courseResult[0];

    // 담당 교사 정보 가져오기
    const teacherResult = await db.query('SELECT * FROM teacher WHERE id = ?', [course.teacher_id]);

    const teacher = teacherResult.length > 0 ? teacherResult[0] : null;

    res.json({ course, teacher });
  } catch (error) {
    console.error('과목 상세 정보 요청 에러:', error);
    res.status(500).json({ message: '서버 에러가 발생했습니다.' });
  }
});

module.exports = router;
