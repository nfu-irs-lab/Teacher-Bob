// https://peihsinsu.gitbooks.io/node-js-500-samples/content/mdfiles/SocketProgramming.html
import { Socket } from "net";
import { EOLPackageHandler } from "./concrete_communication";

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

var net = require('net');
let handelr=new EOLPackageHandler();
let encoder=new TextEncoder();

var server = net.createServer((socket:Socket)=>{
    socket.on('data',(data:Buffer)=>{
        console.log("receive:"+data.toString()+"\n")
    })
      while(true)
        socket.write(handelr.convertStringToPackage('Hello World'));
});

// 未指定port位置，則會動態使用系統可用Port
server.listen({host:"127.0.0.1",port:4444},function() {
  var address = server.address();
  console.log("opened server on %j", address);
});