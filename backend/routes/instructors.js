// server/routes/instructors.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// 특정 강사의 상세 정보 및 담당 과목들 가져오기
router.get('/:id', async (req, res) => {
  const instructorId = req.params.id;

  try {
    // 강사 정보 가져오기
    const instructorResult = await db.query('SELECT * FROM teacher WHERE id = ?', [instructorId]);

    if (instructorResult.length === 0) {
      return res.status(404).json({ message: '강사를 찾을 수 없습니다.' });
    }

    const instructor = instructorResult[0];

    // 강사가 담당하는 과목들 가져오기
    const coursesResult = await db.query('SELECT * FROM course WHERE teacher_id = ?', [instructorId]);

    const courses = coursesResult;

    res.json({ instructor, courses });
  } catch (error) {
    console.error('강사 상세 정보 요청 에러:', error);
    res.status(500).json({ message: '서버 에러가 발생했습니다.' });
  }
});

module.exports = router;
