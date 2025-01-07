// routes/userVideos.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // db.js 파일 경로에 맞게 수정

// 특정 비디오 상세 정보 가져오기
router.get('/:id', async (req, res) => {
  const videoId = req.params.id;
  try {
    // 비디오 정보 조회
    const [videoRows] = await db.execute('SELECT * FROM videos WHERE id = ?', [videoId]);
    if (videoRows.length === 0) {
      return res.status(404).json({ success: false, message: '비디오를 찾을 수 없습니다.' });
    }
    const video = videoRows[0];

    // 강의 정보 조회
    const [courseRows] = await db.execute('SELECT * FROM courses WHERE id = ?', [video.course_id]);
    const course = courseRows.length > 0 ? courseRows[0] : null;

    // 강사 정보 조회
    const [teacherRows] = await db.execute('SELECT * FROM teachers WHERE id = ?', [course.teacher_id]);
    const teacher = teacherRows.length > 0 ? teacherRows[0] : null;

    res.json({
      success: true,
      course,
      teacher,
      video,
    });
  } catch (error) {
    console.error('비디오 상세 정보 요청 실패:', error);
    res.status(500).json({ success: false, message: '비디오 상세 정보를 불러오는 데 실패했습니다.' });
  }
});

// 특정 사용자에 대한 비디오 리스트 조회
router.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const query = `
      SELECT 
          v.id AS video_id,
          v.course_id,
          v.youtube_id,
          v.progress
      FROM 
          enrolls e
      JOIN 
          videos v ON e.course_id = v.course_id
      WHERE 
          e.user_id = ?
      ORDER BY 
          v.progress DESC,
          v.id ASC;
    `;

    const [rows] = await db.execute(query, [userId]);

    res.json({
      success: true,
      videos: rows
    });
  } catch (error) {
    console.error('Error fetching user videos:', error);
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
});

module.exports = router;
