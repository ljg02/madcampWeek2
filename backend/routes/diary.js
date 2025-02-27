// routes/diary.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // 데이터베이스 연결 모듈
const { analyzeSentiment } = require('../utils/sentimentAnalysis'); //감정분석 함수

// 날짜 형식 변환 함수
const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
        return null; // 유효하지 않은 날짜 처리
    }
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
};

// 일기 목록 불러오기
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const [diaries] = await db.query('SELECT * FROM diaries WHERE user_id = ?', [userId]);
        res.json({ success: true, diaries });
    } catch (error) {
        console.error('일기 불러오기 오류:', error);
        res.status(500).json({ success: false, message: '서버 오류 발생.' });
    }
});

// 일기 추가하기
router.post('/', async (req, res) => {
    //console.log(req.body);
    const { userId, entry, date } = req.body;

    if (!userId || !entry || !date) {
        return res.status(400).json({ success: false, message: 'userId, entry, date는 필수입니다.' });
    }
    const formattedDate = formatDate(date);

    try {
        // 감정 분석 수행
        const sentimentResult = await analyzeSentiment(entry);
        console.log('Sentiment Result:', sentimentResult); // 반환값 확인
        if (!sentimentResult) {
            return res.status(500).json({ success: false, message: '감정 분석 실패' });
        }

        const [result] = await db.query(
            'INSERT INTO diaries (user_id, entry, date, sentiment_score) VALUES (?, ?, ?, ?)', 
            [userId, entry, formattedDate, sentimentResult.score]
        );
        const newDiary = {
            id: result.insertId,
            user_id: userId,
            entry,
            date, 
            sentiment_score: sentimentResult.score,
        };
        res.status(201).json({ success: true, diary: newDiary });
    } catch (error) {
        console.error('일기 추가 실패:', error);
        res.status(500).json({ success: false, message: '서버 오류 발생.' });
    }
});

// 일기 삭제하기
router.delete('/:entryId', async (req, res) => {
    const { entryId } = req.params;
    const { userId } = req.body;

    if (!userId || !entryId) {
        return res.status(400).json({ success: false, message: 'userId와 entryId는 필수입니다.' });
    }

    try {
        const [result] = await db.query('DELETE FROM diaries WHERE id = ? AND user_id = ?', [entryId, userId]);

        if (result.affectedRows > 0) {
            res.json({ success: true, message: '일기가 삭제되었습니다.' });
        } else {
            res.status(404).json({ success: false, message: '일기를 찾을 수 없습니다.' });
        }
    } catch (error) {
        console.error('일기 삭제 실패:', error);
        res.status(500).json({ success: false, message: '서버 오류 발생.' });
    }
});

module.exports = router;
