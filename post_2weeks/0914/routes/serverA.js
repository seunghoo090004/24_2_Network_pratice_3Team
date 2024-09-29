const express = require('express');
const axios = require('axios');
const router = express.Router();

// 서버 A에서 서버 B로 데이터 전달
router.post('/', async (req, res) => {
    console.log('req.body:', req.body);  // req.body 값 확인

    const item = req.body.item;

    // 필드 검증
    if (!item) {
        return res.status(400).json({ error: 'item 필드가 누락되었습니다.' });
    }

    try {
        // 서버 B로 데이터 전송
        const responseFromB = await axios.post('http://localhost:3000/serverB', { item: item });

        // 서버 B로부터 받은 응답을 클라이언트로 전송
        res.json({ message: responseFromB.data.message });
    } catch (error) {
        if (error.response) {
            console.error('서버 B 응답 오류:', error.response.data);
            res.status(502).json({ error: '서버 B에서 오류 발생', details: error.response.data });
        } else if (error.request) {
            console.error('서버 B로 요청 전송 실패:', error.request);
            res.status(503).json({ error: '서버 B와의 통신 오류' });
        } else {
            console.error('서버 A 내부 오류:', error.message);
            res.status(500).json({ error: '서버 A 내부 오류' });
        }
    }
});

module.exports = router;
