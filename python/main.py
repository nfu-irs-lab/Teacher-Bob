import socket

bind_ip = "0.0.0.0"
bind_port = 4444
EOP = bytes([0xe2, 0x80, 0xA9]).decode('utf-8')

if __name__ == "__main__":
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind((bind_ip, bind_port))
    server.listen(5)

    while True:
        client, address = server.accept()
        print("Connected:", address)
        try:
            while True:
                data = client.recv(4096)
                print("receive:")
                print(data)

                strs = data.decode(encoding='utf-8')

                if strs.__contains__(EOP):
                    print(strs.index(strs))
                client.send("ACK!".encode('utf-8'))

        except Exception as e:
            print(e.__str__())
