const express = require('express');
const axios = require('axios');
const router = express.Router();

// 서버 A에서 서버 B로 데이터 전달
router.post('/', async (req, res) => {
    const item = req.body.item;

    // 빈 값 검증 추가
    if (!item || item.trim() === '') {
        return res.status(400).json({ error: 'item 필드가 비어 있습니다.' });
    }

    // 특정 조건에서 강제 오류 발생
    if (item === 'force_error') {
        return res.status(500).json({ error: '강제 오류 발생: 서버 내부 오류' });
    }

    try {
        // 서버 B로 데이터 전달, 타임아웃 5초 설정
        const responseFromB = await axios.post('http://localhost:3000/serverB', { item: item }, {
            timeout: 5000 // 타임아웃 설정
        });
        res.json({ message: responseFromB.data.message });
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error('서버 B 타임아웃 오류');
            return res.status(504).json({ error: '서버 B 응답 타임아웃' });
        }
        if (error.response) {
            return res.status(502).json({
                error: '서버 B에서 오류 발생',
                details: error.response.data
            });
        } else {
            return res.status(500).json({ error: '서버 A 내부 오류', message: error.message });
        }
    }
});

module.exports = router;
