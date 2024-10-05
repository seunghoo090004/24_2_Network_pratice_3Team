const express = require('express');
const fs = require('fs');
const router = express.Router();

// 서버 A에서 받은 데이터를 처리
router.post('/', (req, res) => {
    const item = req.body.item;

    // 문자열 데이터 형식 검증 추가
    if (!item || typeof item !== 'string') {
        return res.status(400).json({ error: '유효하지 않은 데이터입니다. item 필드는 문자열이어야 합니다.' });
    }

    try {
        // 특정 조건에서 파일 읽기 오류를 강제로 발생시킴 (파일이 없을 때)
        if (item === 'force_file_error') {
            const data = fs.readFileSync('/path/to/nonexistent/file.txt');
            return res.json({ message: '파일 읽기 성공', data: data });
        }

        res.json({
            message: `${item}이(가) 성공적으로 처리되었습니다.`
        });
    } catch (error) {
        console.error('서버 B 처리 오류:', error);
        res.status(500).json({
            error: '파일 읽기 오류가 발생했습니다.',
            message: error.message
        });
    }
});

module.exports = router;
