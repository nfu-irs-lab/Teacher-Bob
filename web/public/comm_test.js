"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const concrete_communication_1 = require("./concrete_communication");
let handler = new concrete_communication_1.EOLPackageHandler();
handler.handle([0x31, 0x32, 0x33, 0x04, 0x35, 0x36]);
console.log(handler.getPackageAndNext());
//# sourceMappingURL=comm_test.js.map