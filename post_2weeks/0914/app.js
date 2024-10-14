const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const serverARouter = require('./routes/serverA');
const serverBRouter = require('./routes/serverB');
const app = express();

// 프로덕션 또는 개발 모드를 코드에서 직접 설정
const mode = 'development';  // 'production' 또는 'development'로 설정

// 잘못된 Content-Type 헤더 처리 (POST 요청일 때)
app.use((req, res, next) => {
    if (req.method === 'POST' && req.headers['content-type'] !== 'application/json') {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Content-Type 헤더는 application/json이어야 합니다.'
        });
    }
    next();
});

// 잘못된 메서드 처리 (GET, POST 이외의 메서드 요청 시)
app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method Not Allowed',
            message: `${req.method} 요청은 이 경로에서 허용되지 않습니다.`
        });
    }
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/serverA', serverARouter);
app.use('/serverB', serverBRouter);

// 404 처리
app.use((req, res) => {
    res.status(404).json({
        error: '잘못된 URL입니다. 요청한 페이지를 찾을 수 없습니다.'
    });
});

// JSON 파싱 오류 처리 및 전역 에러 핸들러 추가
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
        if ('body' in err) {
            console.error('잘못된 JSON 형식이 전송되었습니다:', err.message);
            return res.status(400).json({
                status: 'error',
                message: '잘못된 JSON 형식이 전송되었습니다. JSON 구문을 확인하세요.',
                details: err.message
            });
        }
    }
    
    // 기존 전역 에러 핸들러
    res.status(err.status || 500).json({
        error: '서버 내부 오류가 발생했습니다.',
        message: err.message
    });
});

module.exports = app;
