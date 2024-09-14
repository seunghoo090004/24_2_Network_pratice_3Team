#!/usr/bin/env node

const app = require('../app');
const http = require('http');

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
