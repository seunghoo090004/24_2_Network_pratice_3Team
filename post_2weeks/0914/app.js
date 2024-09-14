const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const serverARouter = require('./routes/serverA'); // 서버 A 라우터
const serverBRouter = require('./routes/serverB'); // 서버 B 라우터

const app = express();

// JSON 데이터 파싱을 위한 body-parser 설정
app.use(bodyParser.json());  // JSON 형식의 데이터를 파싱
app.use(bodyParser.urlencoded({ extended: true }));

// 정적 파일 제공 (프론트엔드 HTML 파일)
app.use(express.static(path.join(__dirname, 'public')));

// 라우터 설정
app.use('/serverA', serverARouter); // 서버 A 요청 처리
app.use('/serverB', serverBRouter); // 서버 B 요청 처리

module.exports = app;
