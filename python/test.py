import socket
from threading import Thread

from net.tcp_handler import PackageHandler

HOST = '127.0.0.1'
PORT = 4444


def receive(socket):
    while True:
        data = socket.recv(4096)
        handler.handle(data)
        while handler.hasPackage():
            package = handler.getPackageAndNext()
            strs = package.decode(encoding='utf-8')
            print("receive:", strs)


if __name__ == "__main__":
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((HOST, PORT))
    handler = PackageHandler()
    th = Thread(target=receive, args=(s,))
    th.start()

    while True:
        text = input()
        package = handler.convertToPackage(text.encode(encoding='utf-8'))
        s.send(package)
