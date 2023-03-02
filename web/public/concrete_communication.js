"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TCPClientCommDevice = exports.EOLPackageHandler = void 0;
var net = require('net');
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
            return new Uint8Array(this.packages.shift());
        }
        else {
            throw "No package";
        }
    }
    convertToPackage(data) {
        let buffer = new Uint8Array(data.length + this.endOfTransmission.length);
        for (let i = 0; i < buffer.length; i++) {
            if (i < data.length)
                buffer[i] = data[i];
            else
                buffer[i] = this.endOfTransmission[i - data.length];
        }
        return buffer;
    }
    convertStringToPackage(data) {
        let encoder = new TextEncoder();
        return this.convertToPackage(encoder.encode(data));
    }
    getIndexOfFirstEOL(data) {
        for (let i = 0; i < data.length; i++) {
            let found = 0;
            for (let j = 0; j < this.endOfTransmission.length; j++) {
                if (i + j < data.length) {
                    let a = this.endOfTransmission[j];
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
class TCPClientCommDevice {
    constructor(port, host, handler) {
        this.client = new net.Socket();
        this.port = port;
        this.host = host;
        this.handler = handler;
    }
    setOnReadCallback(callback) {
        this.onReadCallback = callback;
    }
    open() {
        /**
         * 使用port與host來設定socket物件
         */
        this.client.connect(this.port, this.host, function () {
            //連線時候訊息與操作
            console.log('CONNECTED');
        });
        this.client.on('data', (data) => {
            this.handler.handle(data);
            while (this.handler.hasPackage()) {
                this.onReadCallback(this.handler.getPackageAndNext());
            }
        });
    }
    write(data) {
        let package_data = this.handler.convertToPackage(data);
        this.client.write(new Uint8Array(package_data));
        return data.length;
    }
    writeString(data) {
        let package_data = this.handler.convertStringToPackage(data);
        this.client.write(new Uint8Array(package_data));
        return data.length;
    }
    close() {
        this.client.destroy();
    }
}
exports.TCPClientCommDevice = TCPClientCommDevice;
//# sourceMappingURL=concrete_communication.js.map