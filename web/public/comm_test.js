"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const concrete_communication_1 = require("./concrete_communication");
let handler = new concrete_communication_1.EOLPackageHandler();
let utf8decoder = new TextDecoder("utf-8");
let commDevice = new concrete_communication_1.TCPClientCommDevice(4444, '127.0.0.1', handler);
commDevice.setOnReadCallback((data) => {
    let text = utf8decoder.decode(data);
    console.log(text);
});
commDevice.open();
//# sourceMappingURL=comm_test.js.map