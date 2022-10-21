import socket

HOST = '127.0.0.1'
PORT = 4444
EOP = bytes([0xe2, 0x80, 0xA9]).decode('utf-8')

if __name__ == "__main__":
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((HOST, PORT))

    while True:
        s.send("AAAA".encode(encoding='utf-8'))
        s.send(EOP.encode(encoding='utf-8'))
        s.send("BBBB".encode(encoding='utf-8'))

        data = s.recv(1024)
        print("server send : %s " % (data))
