const express = require('express');
const router = express.Router();
const db = require('../db'); // db.js에서 연결 설정한 모듈

// mock_exam_cutoffs 데이터 가져오기
router.get('/', async (req, res) => {
    try {
      const [results] = await db.query('SELECT * FROM mock_exam_cutoffs');
      res.json(results);
    } catch (err) {
      console.error('모의고사 조회 에러', err);
      res.status(500).send({ success: false, message: '서버 오류.' });
    }
  });

module.exports = router;
