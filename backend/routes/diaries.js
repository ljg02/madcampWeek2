// 예시: routes/diaries.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // 데이터베이스 연결 객체

// GET /api/diaries?userId=...&date=...
router.get('/', async (req, res) => {
  const { userId, date } = req.query;
  if (!userId || !date) {
    return res.status(400).json({ success: false, message: "필요한 파라미터가 없습니다." });
  }

  try {
    // SQL 쿼리: user_id와 date에 해당하는 일기 조회
    const query = 'SELECT * FROM diaries WHERE user_id = ? AND date = ?';
    const [rows] = await db.execute(query, [userId, date]);

    return res.json({ success: true, diaries: rows });
  } catch (error) {
    console.error('일기 조회 실패:', error);
    return res.status(500).json({ success: false, message: "서버 오류" });
  }
});

module.exports = router;
