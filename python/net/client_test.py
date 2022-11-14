import socket

from net.tcp_handler import PackageHandler

HOST = '127.0.0.1'
PORT = 4444

if __name__ == "__main__":
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((HOST, PORT))
    handler = PackageHandler()
    while True:
        text = input()
        package = handler.convertToPackage(text.encode(encoding='utf-8'))
        s.send(package)
