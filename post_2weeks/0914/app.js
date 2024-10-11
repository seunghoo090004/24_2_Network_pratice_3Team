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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/serverA', serverARouter);
app.use('/serverB', serverBRouter);

// 잘못된 URL 처리 미들웨어 추가
app.use((req, res) => {
    if (req.url.startsWith('/serverA') || req.url.startsWith('/serverB')) {
        // '/serverA' 또는 '/serverB' 경로일 경우에는 404 처리를 하지 않음
        return;
    }
    
    res.status(404).json({
        error: '잘못된 URL입니다. 요청한 페이지를 찾을 수 없습니다.'
    });
});

// 전역 에러 핸들러
app.use((err, req, res, next) => {
    console.error(`전역 에러 핸들러: ${err.message}이 발생했습니다.`);

    const isProduction = (mode === 'production');  // 모드에 따라 프로덕션 여부 결정
    const response = {
        error: '서버 내부 오류가 발생했습니다.',
        message: err.message,
        method: req.method,
        url: req.url,
        clientIp: req.ip // 클라이언트 IP 로깅
    };

    // 스택 트레이스는 개발 환경에서만 출력
    if (!isProduction) {
        response.stack = err.stack;  // 개발 환경에서만 스택 트레이스 포함
    }

    res.status(500).json(response);
});

module.exports = app;
