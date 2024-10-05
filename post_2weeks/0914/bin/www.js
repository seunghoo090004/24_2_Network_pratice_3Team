#!/usr/bin/env node

const app = require('../app');
const http = require('http');

// 포트 충돌 방지를 위한 에러 처리
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

// 서버 에러 핸들러
server.on('error', onError);
server.on('listening', onListening);

server.listen(port);

// 포트 충돌을 확인하는 함수
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

// 에러 핸들러 함수
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(`${bind}는 높은 권한이 필요합니다. 오류 세부 사항: ${error.message}`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind}는 이미 사용 중입니다. 오류 세부 사항: ${error.message}`);
            process.exit(1);
            break;
        default:
            console.error(`예상치 못한 오류가 발생했습니다: ${error.message}`);
            throw error;
    }
}

// 서버가 성공적으로 시작되었을 때
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
