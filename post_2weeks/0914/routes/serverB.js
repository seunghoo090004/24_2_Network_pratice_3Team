const express = require('express');
const router = express.Router();

// 서버 A에서 받은 데이터를 처리
router.post('/', (req, res) => {
    const item = req.body.item;

    // 필드 검증
    if (!item) {
        return res.status(400).json({ error: 'item 필드가 누락되었습니다.' });
    }

    try {
        // 서버 A로 응답
        res.json({
            message: `${item}이 처리되었습니다.`
        });
    } catch (error) {
        console.error('서버 B 처리 오류:', error);
        res.status(500).json({ error: '서버 B 내부 오류' });
    }
});

module.exports = router;
