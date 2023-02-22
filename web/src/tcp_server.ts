// https://peihsinsu.gitbooks.io/node-js-500-samples/content/mdfiles/SocketProgramming.html
import { Socket } from "net";

var net = require('net');

var server = net.createServer((socket:Socket)=>{
    socket.on('data',(data:Buffer)=>{
        console.log("receive:"+data.toString()+"\n")
        socket.write(data.toString())
    })
});

// 未指定port位置，則會動態使用系統可用Port
server.listen({host:"127.0.0.1",port:4444},function() {
  var address = server.address();
  console.log("opened server on %j", address);
});