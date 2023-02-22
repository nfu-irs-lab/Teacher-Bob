// https://peihsinsu.gitbooks.io/node-js-500-samples/content/mdfiles/SocketProgramming.html
var net = require('net');

var HOST = 'localhost';
var PORT = 4444;

var client = new net.Socket();
/**
 * 使用port與host來設定socket物件
 */
client.connect(PORT,HOST, function() {
  //連線時候訊息與操作
  console.log('CONNECTED TO: ' + HOST + ':' + PORT);
  // Write a message to the socket as soon as the client is connected, 
  // the server will receive it as message from the client

  for(var i=0;i<10;i++){
    client.write('I am Chuck Norris!'+String.fromCharCode(0x04));
  }

});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', (data:Buffer) =>{
    console.log('DATA: ' + data);
    // Close the client socket completely

});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});