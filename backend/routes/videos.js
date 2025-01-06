// routes/userVideos.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // db.js 파일 경로에 맞게 수정

// 특정 사용자에 대한 비디오 리스트 조회
router.get('/:userId', async (req, res) => {
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
