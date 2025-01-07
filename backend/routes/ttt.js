const express = require('express');
const router = express.Router();
const db = require('../db');

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

// ✅ 시간표 저장
router.post('/', async (req, res) => {
    const { userId, timeTable, date } = req.body.payload;
    const formattedDate = formatDate(date);

    try {
        await db.query('DELETE FROM ttt WHERE user_id = ? AND date = ?', [userId, formattedDate]);
        
        //console.log('timetable: ', timeTable)
        const values = timeTable.map(({ hour, minute, color }) => [userId, hour, minute, color, formattedDate]);

        if (values.length > 0) {
            await db.query(
                `INSERT INTO ttt (user_id, hour, minute, color, date) VALUES ?`,
                [values]
            );
        }
        res.status(200).send({ success: true, message: '시간표가 저장되었습니다.' });
    } catch (error) {
        console.error('시간표 저장 실패:', error);
        res.status(500).send({ success: false, message: '서버 오류 발생.' });
    }
});

// ✅ 시간표 불러오기
router.get('/:userId/:date', async (req, res) => {
    const { userId, date } = req.params;
    const formattedDate = formatDate(date);

    try {
        const [results] = await db.query('SELECT * FROM ttt WHERE user_id = ? AND date = ?', [userId, formattedDate]);
        res.json({ success: true, timeTable: results });
    } catch (error) {
        console.error('시간표 불러오기 오류:', error);
        res.status(500).send({ success: false, message: '서버 오류 발생.' });
    }
});

module.exports = router;
