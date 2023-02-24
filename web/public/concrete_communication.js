"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EOLPackageHandler = void 0;
let EOT = [0x04];
// 傳輸資料時所需要之通訊協定
class EOLPackageHandler {
    constructor(endOfTransmission = EOT) {
        this.endOfTransmission = endOfTransmission;
        this.buffer = [];
        this.packages = [];
    }
    handle(data) {
        data.forEach(byteData => {
            this.buffer.push(byteData);
        });
        let indexOfFirstEOL = this.getIndexOfFirstEOL(this.buffer);
        while (indexOfFirstEOL != -1) {
            this.packages.push(this.buffer.slice(0, indexOfFirstEOL));
            this.buffer.splice(0, indexOfFirstEOL + this.endOfTransmission.length);
            indexOfFirstEOL = this.getIndexOfFirstEOL(this.buffer);
        }
    }
    hasPackage() {
        return this.packages.length > 0;
    }
    getPackageAndNext() {
        if (this.hasPackage()) {
            let b = this.packages.shift();
            return b;
        }
        else {
            throw "No package";
        }
    }
    convertToPackage(data) {
        let buffer = [];
        return buffer.concat(data, this.endOfTransmission);
    }
    getIndexOfFirstEOL(data) {
        for (let i = 0; i < data.length; i++) {
            let found = 0;
            for (let j = 0; j < this.endOfTransmission.length; j++) {
                if (i + j < data.length) {
                    let a = this.endOfTransmission[i];
                    let b = data[i + j];
                    if (a == b)
                        found++;
                }
            }
            if (found == this.endOfTransmission.length)
                return i;
        }
        return -1;
    }
}
exports.EOLPackageHandler = EOLPackageHandler;
//# sourceMappingURL=concrete_communication.js.map