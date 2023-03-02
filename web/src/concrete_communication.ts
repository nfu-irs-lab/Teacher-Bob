import { homedir } from "os";
import {CommDevice, PackageHandler} from "./framework_communication";
import { Socket } from "net";
import { buffer } from "stream/consumers";
var net = require('net');

let EOT=[0x04] as number[];
// 傳輸資料時所需要之通訊協定
export class EOLPackageHandler implements PackageHandler{
    endOfTransmission:number[];
    buffer:number[];
    packages:number[][];

    constructor(endOfTransmission:number[]=EOT){
        this.endOfTransmission=endOfTransmission;
        this.buffer=[];
        this.packages=[];
    }

    handle(data: Uint8Array): void {
        data.forEach(byteData => {
            this.buffer.push(byteData)
        });

        let indexOfFirstEOL=this.getIndexOfFirstEOL(this.buffer);
        while(indexOfFirstEOL!=-1){
            this.packages.push(this.buffer.slice(0,indexOfFirstEOL))
            this.buffer.splice(0,indexOfFirstEOL+this.endOfTransmission.length)
            indexOfFirstEOL=this.getIndexOfFirstEOL(this.buffer);
        }
    }


    hasPackage(): boolean {
        return this.packages.length>0;
    }

    getPackageAndNext(): Uint8Array{
        if(this.hasPackage()){
            return new Uint8Array(this.packages.shift() as number[]);
        }else{
            throw "No package";
        }
    }
    convertToPackage(data: Uint8Array): Uint8Array {
        let buffer=new Uint8Array(data.length+this.endOfTransmission.length);
        for(let i=0;i<buffer.length;i++){
            if(i<data.length)
                buffer[i]=data[i];
            else
                buffer[i]=this.endOfTransmission[i-data.length];
        }
        return buffer;
    }

    convertStringToPackage(data: string): Uint8Array {
        let encoder=new TextEncoder();
        return this.convertToPackage(encoder.encode(data));
    }


    getIndexOfFirstEOL(data:number[]): number {
        for(let i=0;i<data.length;i++){
            let found=0;
            for(let j=0;j<this.endOfTransmission.length;j++){
                if(i+j<data.length){
                    let a=this.endOfTransmission[j];
                    let b=data[i+j];
                    if(a==b)
                        found++;
                }
            }
            if(found==this.endOfTransmission.length)
                return i;
        }
        return -1;
    }

}
export class TCPClientCommDevice implements CommDevice{
    port:number;
    host:string;
    client:Socket;
    handler:PackageHandler;
    private onReadCallback!: (data: Uint8Array) => void;
    

    constructor(port:number,host:string,handler:PackageHandler){
        this.client = new net.Socket();
        this.port=port;
        this.host=host;
        this.handler=handler;
    }

    setOnReadCallback(callback: (data: Uint8Array) => void): void {
        this.onReadCallback=callback;
    }

    open(): void {
        /**
         * 使用port與host來設定socket物件
         */
        this.client.connect(this.port,this.host, function() {
            //連線時候訊息與操作
            console.log('CONNECTED');
        });

        this.client.on('data', (data:Buffer) =>{
            this.handler.handle(data);

            while(this.handler.hasPackage()){
                this.onReadCallback(this.handler.getPackageAndNext());
            }

        });
    }
    write(data: Uint8Array): number {
        let package_data=this.handler.convertToPackage(data);
        this.client.write(new Uint8Array(package_data))
        return data.length;
    }

    writeString(data: string): number {
        let package_data=this.handler.convertStringToPackage(data);
        this.client.write(new Uint8Array(package_data))
        return data.length;
    }

    close(): void {
        this.client.destroy()
    }

}