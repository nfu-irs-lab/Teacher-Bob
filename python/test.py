import socket

from net.tcp_handler import PackageHandler


HOST = '127.0.0.1'
PORT = 4444

if __name__ == "__main__":
    while True:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((HOST, PORT))
        handler = PackageHandler()
        try:
            s.send(handler.convertToPackage("OBJECT_DETECTOR DISABLE".encode('utf-8')))
            s.send(handler.convertToPackage("FACE_DETECTOR DISABLE".encode('utf-8')))

            # s.send(handler.convertToPackage("FACE_DETECTOR ENABLE".encode('utf-8')))
            s.send(handler.convertToPackage("OBJECT_DETECTOR ENABLE".encode('utf-8')))
            while True:
                handler.handle(s.recv(4096))
                while handler.hasPackage():
                    package = handler.getPackageAndNext()
                    strs = package.decode(encoding='utf-8')
                    print("receive:", strs)

        except Exception as e:
            print(e.__str__())

