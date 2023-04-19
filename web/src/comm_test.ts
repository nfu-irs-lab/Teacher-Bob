import { EOLPackageHandler,TCPClientCommDevice} from "./concrete_communication";
let handler=new EOLPackageHandler();
let utf8decoder = new TextDecoder("utf-8");
let commDevice=new TCPClientCommDevice(4444,'127.0.0.1',handler);
commDevice.setOnReadCallback((data:Uint8Array)=>{
    let text:string=utf8decoder.decode(data);
    console.log(text);
});

commDevice.open();