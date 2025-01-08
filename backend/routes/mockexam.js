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


// exam_date가 같은 모든 데이터 조회 라우터
router.get('/:examDate', async (req, res) => {
    const { examDate } = req.params;
    try {
        const query = `SELECT * FROM mock_exam_cutoffs WHERE exam_date = ?`;
        const [results] = await db.query(query, [examDate]);
        
        if (results.length > 0) {
            res.json(results);
        } else {
            res.status(404).send({ message: "해당 날짜의 데이터가 존재하지 않습니다." });
        }
    } catch (error) {
        console.error('데이터 불러오기 오류:', error);
        res.status(500).send({ message: '서버 오류 발생' });
    }
});

module.exports = router;
