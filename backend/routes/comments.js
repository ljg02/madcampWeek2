// server/routes/comments.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // 데이터베이스 연결 모듈
const { analyzeSentiment } = require('../utils/sentimentAnalysis'); //감정분석 함수

// 특정 비디오의 모든 댓글 가져오기
router.get('/video/:videoId', async (req, res) => {
    const { videoId } = req.params;
    try {
        const [comments] = await db.execute(
            `SELECT c.id, c.content, c.created_at, c.sentiment_score, u.id AS user_id, u.name AS user_name 
             FROM comments c 
             JOIN users u ON c.user_id = u.id 
             WHERE c.video_id = ? 
             ORDER BY c.created_at DESC`,
            [videoId]
        );
        res.json({ success: true, comments });
    } catch (error) {
        console.error('댓글 가져오기 실패:', error);
        res.status(500).json({ success: false, message: '댓글을 가져오는 데 실패했습니다.' });
    }
});

// 새로운 댓글 작성하기
router.post('/', async (req, res) => {
    const { video_id, content, user_id } = req.body;

    if (!video_id || !content) {
        return res.status(400).json({ success: false, message: 'video_id와 content는 필수입니다.' });
    }

    try {
        // 감정 분석 수행
        const sentimentResult = await analyzeSentiment(content);
        console.log('Sentiment Result:', sentimentResult); // 반환값 확인
        if (!sentimentResult) {
            return res.status(500).json({ success: false, message: '감정 분석 실패' });
        }

        const [result] = await db.execute(
            `INSERT INTO comments (user_id, video_id, content, sentiment_score) VALUES (?, ?, ?, ?)`,
            [user_id, video_id, content, sentimentResult.score]
        );

        const [newComment] = await db.execute(
            `SELECT c.id, c.content, c.created_at, c.sentiment_score, u.id AS user_id, u.name AS user_name 
             FROM comments c 
             JOIN users u ON c.user_id = u.id 
             WHERE c.id = ?`,
            [result.insertId]
        );
        res.json({ success: true, message: '댓글이 성공적으로 작성되었습니다.', comment: newComment[0] });
    } catch (error) {
        console.error('댓글 작성 실패:', error);
        res.status(500).json({ success: false, message: '댓글을 작성하는 데 실패했습니다.' });
    }
});

//댓글 삭제 엔드포인트
router.delete('/:commentId', async (req, res) => {
    const { commentId } = req.params;

    try {
        const [rows] = await db.execute(
            `SELECT user_id FROM comments WHERE id = ?`,
            [commentId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: '댓글을 찾을 수 없습니다.' });
        }

        await db.execute(`DELETE FROM comments WHERE id = ?`, [commentId]);
        res.json({ success: true, message: '댓글이 삭제되었습니다.' });
    } catch (error) {
        console.error('댓글 삭제 에러:', error);
        res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
    }
});


module.exports = router;
