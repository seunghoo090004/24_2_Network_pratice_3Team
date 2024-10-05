const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const serverARouter = require('./routes/serverA');
const serverBRouter = require('./routes/serverB');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/serverA', serverARouter);
app.use('/serverB', serverBRouter);

// 에러 핸들러
app.use((err, req, res, next) => {
    console.error('전역 에러 핸들러:', err.stack);

    const isProduction = process.env.NODE_ENV === 'production';
    const response = {
        error: '서버 내부 오류가 발생했습니다.',
        message: err.message,
        method: req.method,
        url: req.url,
        clientIp: req.ip // 클라이언트 IP 로깅
    };

    if (!isProduction) {
        response.stack = err.stack; // 개발 환경에서만 스택 트레이스 제공
    }

    res.status(500).json(response);
});

module.exports = app;
