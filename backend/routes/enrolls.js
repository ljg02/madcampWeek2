// server/routes/enrolls.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // 데이터베이스 연결 모듈

// 사용자가 신청한 강의 목록 가져오기
router.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const [results] = await db.query(`
            SELECT 
                e.course_id, 
                c.title AS course_title, 
                c.image AS course_image,
                e.progress,
                t.name AS teacher_name,
                t.subject AS teacher_subject,
                t.image AS teacher_profile_image
            FROM 
                enrolls e
            JOIN 
                courses c ON e.course_id = c.id
            JOIN 
                teachers t ON c.teacher_id = t.id
            WHERE 
                e.user_id = ?
        `, [userId]);

        res.json(results);
    } catch (err) {
        console.error('신청한 강의 목록 요청 에러:', err);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 강의 신청 취소하기
router.delete('/cancel', async (req, res) => {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
        return res.status(400).json({ message: 'userId와 courseId가 필요합니다.' });
    }

    try {
        const [result] = await db.query('DELETE FROM enrolls WHERE user_id = ? AND course_id = ?', [userId, courseId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '신청된 강의를 찾을 수 없습니다.' });
        }

        res.json({ message: '강의 신청이 취소되었습니다.' });
    } catch (err) {
        console.error('강의 신청 취소 에러:', err);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

module.exports = router;
