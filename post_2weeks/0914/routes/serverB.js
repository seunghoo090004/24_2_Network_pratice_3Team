const express = require('express');
const router = express.Router();

// 서버 A에서 받은 물품 데이터를 처리
router.post('/', (req, res) => {
    const item = req.body.item;

    // 서버 B에서 배송 시작 메시지
    console.log(`${item}이 배송을 시작했습니다.`);

    // 서버 A로 응답 (터미널 도착)
    res.json({
        message: `${item}이 터미널에 도착했습니다.`
    });
});

module.exports = router;
