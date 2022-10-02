"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const port = 80;
const server = (0, http_1.createServer)((request, response) => {
    response.on('error', (err) => {
        console.error(err);
    });
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end('Hello world!');
});
server.listen(port);
console.log(`server is running on http://localhost:80`);
