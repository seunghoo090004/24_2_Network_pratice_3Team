const express = require('express');
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

// 서버 B에서 데이터 처리
router.post('/', (req, res) => {
    const validationError = validateItem(req.body.item, res);
    if (validationError) return;

    res.status(200).json({
        status: 'success',
        message: `${req.body.item}이(가) 성공적으로 처리되었습니다.`
    });
});

module.exports = router;
