const express = require('express');
const router = express.Router();

// 서버 A에서 받은 데이터를 처리
router.post('/', (req, res) => {
    const item = req.body.item;

    // 데이터가 없는지 확인
    if (!item) {
        return res.status(400).json({ 
            status: 'error', 
            message: '데이터가 전달되지 않았습니다. 값을 입력해 주세요.' 
        });
    }

    // 데이터가 문자열인지 확인
    if (typeof item !== 'string') {
        return res.status(400).json({ 
            status: 'error', 
            message: '잘못된 데이터 형식입니다. 문자열을 입력해 주세요.' 
        });
    }

    // 데이터가 빈 문자열인지 확인
    if (item.trim() === '') {
        return res.status(400).json({ 
            status: 'error', 
            message: '공백만 있는 문자열은 허용되지 않습니다. 유효한 값을 입력해 주세요.' 
        });
    }

    try {
        res.status(200).json({
            status: 'success',
            message: `${item}이(가) 성공적으로 처리되었습니다.`
        });
    } catch (error) {
        console.error('서버 B 처리 오류:', error.message);
        res.status(500).json({
            status: 'error',
            message: '서버 B 내부 오류가 발생했습니다.',
            details: error.message
        });
    }
});

module.exports = router;
