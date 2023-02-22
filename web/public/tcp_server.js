"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var net = require('net');
var server = net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log("receive:" + data.toString() + "\n");
        socket.write(data.toString());
    });
});
// 未指定port位置，則會動態使用系統可用Port
server.listen({ host: "127.0.0.1", port: 4444 }, function () {
    var address = server.address();
    console.log("opened server on %j", address);
});
//# sourceMappingURL=tcp_server.js.map