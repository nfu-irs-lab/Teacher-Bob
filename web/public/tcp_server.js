"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const concrete_communication_1 = require("./concrete_communication");
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
var net = require('net');
let handelr = new concrete_communication_1.EOLPackageHandler();
let encoder = new TextEncoder();
var server = net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log("receive:" + data.toString() + "\n");
    });
    while (true)
        socket.write(handelr.convertStringToPackage('Hello World'));
});
// 未指定port位置，則會動態使用系統可用Port
server.listen({ host: "127.0.0.1", port: 4444 }, function () {
    var address = server.address();
    console.log("opened server on %j", address);
});
//# sourceMappingURL=tcp_server.js.map