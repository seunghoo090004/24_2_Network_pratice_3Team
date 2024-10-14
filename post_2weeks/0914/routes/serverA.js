const express = require('express');
const axios = require('axios');
const router = express.Router();

// 공통 데이터 검증 함수
function validateItem(item, res) {
    if (!item) {
        return res.status(400).json({
            status: 'error',
            message: '데이터가 입력되지 않았습니다. 값을 입력해 주세요.'
        });
    }

    if (typeof item !== 'string') {
        return res.status(400).json({
            status: 'error',
            message: '잘못된 데이터 형식입니다. 문자열을 입력해 주세요.'
        });
    }

    if (item.trim() === '') {
        return res.status(400).json({
            status: 'error',
            message: '공백만 있는 문자열은 허용되지 않습니다. 유효한 값을 입력해 주세요.'
        });
    }
    return null;
}

// 서버 A에서 서버 B로 데이터 전달
router.post('/', async (req, res) => {
    const validationError = validateItem(req.body.item, res);
    if (validationError) return;

    try {
        const responseFromB = await axios.post('http://localhost:3000/serverB', { item: req.body.item.trim() }, {
            timeout: 5000
        });

        res.status(200).json({
            status: 'success',
            message: '서버 B로부터 응답 받음: ' + responseFromB.data.message,
            receivedData: responseFromB.data
        });
    } catch (error) {
        console.error('서버 A에서 발생한 오류:', error.message);

        if (error.code === 'ECONNREFUSED') {
            return res.status(502).json({
                status: 'error',
                message: '서버 B에 연결할 수 없습니다. URL 또는 서버 상태를 확인해 주세요.',
                details: error.message
            });
        }

        if (error.code === 'ECONNABORTED') {
            return res.status(504).json({
                status: 'error',
                message: '서버 B 응답 시간이 초과되었습니다.'
            });
        }

        res.status(500).json({
            status: 'error',
            message: '서버 A에서 내부 오류가 발생했습니다.',
            details: error.message
        });
    }
});


module.exports = router;
