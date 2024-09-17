const express = require('express');
const axios = require('axios');
const router = express.Router();

// 서버 A에서 프론트엔드의 물품을 받아 서버 B로 전달
router.post('/', async (req, res) => {
    const item = req.body.item;

    // 서버 A에서 주문 완료 처리
    const steps = [
        `${item} 배송 준비 중...`,
        `${item}을/를 배송을 시작했습니다.`,
        `${item} 배송 중...`
    ];

    try {
        // 서버 B로 데이터 전송
        const responseFromB = await axios.post('http://localhost:3000/serverB', { item: item });

        // 서버 B로부터 받은 응답 추가
        steps.push(responseFromB.data.message);  // 터미널 도착 메시지

        // 최종적으로 프론트엔드에 배송 완료 메시지 추가
        steps.push(`${item}을/를 배송을 완료했습니다.`);

        // 클라이언트로 모든 단계를 전송
        res.json({ steps });
    } catch (error) {
        res.status(500).json({ error: '서버 A에서 서버 B로 요청 실패', details: error.message });
    }
});

module.exports = router;
