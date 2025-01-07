// server/routes/comments.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // 데이터베이스 연결 모듈

// 특정 비디오의 모든 댓글 가져오기
router.get('/video/:videoId', async (req, res) => {
    const { videoId } = req.params;
    try {
        const [comments] = await db.execute(
            `SELECT c.id, c.content, c.created_at, u.id AS user_id, u.name AS user_name 
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
        const [result] = await db.execute(
            `INSERT INTO comments (user_id, video_id, content) VALUES (?, ?, ?)`,
            [user_id, video_id, content]
        );

        const [newComment] = await db.execute(
            `SELECT c.id, c.content, c.created_at, u.id AS user_id, u.name AS user_name 
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

module.exports = router;
