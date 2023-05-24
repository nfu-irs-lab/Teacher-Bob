"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const concrete_communication_1 = require("./concrete_communication");
document.getElementById("connect").onclick = conntect;
function conntect() {
    var commDevice = new concrete_communication_1.TCPClientCommDevice(4444, '192.168.0.190', new concrete_communication_1.EOLPackageHandler());
    commDevice.open();
    commDevice.writeString("OBJECT_DETECTOR ENABLE");
}
//# sourceMappingURL=python_bridge.js.map