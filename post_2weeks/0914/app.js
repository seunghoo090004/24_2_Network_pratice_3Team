const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const serverARouter = require('./routes/serverA'); 
const serverBRouter = require('./routes/serverB'); 

const app = express();

// 미들웨어 에러 처리
try {
    // JSON 데이터 파싱을 위한 body-parser 설정
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
} catch (error) {
    console.error('Body parser 미들웨어 설정 오류:', error);
}

// 정적 파일 제공
try {
    app.use(express.static(path.join(__dirname, 'public')));
} catch (error) {
    console.error('정적 파일 제공 오류:', error);
}

// 라우터 설정
try {
    app.use('/serverA', serverARouter);
    app.use('/serverB', serverBRouter);
} catch (error) {
    console.error('라우터 설정 오류:', error);
}

// 에러 핸들러
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('서버 내부 오류');
});

module.exports = app;
