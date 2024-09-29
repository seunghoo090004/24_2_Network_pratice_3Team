const express = require('express');
const router = express.Router();

// 홈 페이지 요청 처리
router.get('/', function (req, res, next) {
    try {
        res.send('Welcome to My Express App!');
    } catch (error) {
        console.error('홈 페이지 요청 처리 중 오류:', error);
        res.status(500).send('서버 내부 오류');
    }
});

module.exports = router;
