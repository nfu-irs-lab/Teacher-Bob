from tcp_handler import PackageHandler

handler = PackageHandler()
handler.handle(bytes([1, 2, 3, 4, 0xe2, 0x80, 0xA9, 5, 6, 7, 8, 0xe2, 0x80, 0xA9, 10, 11, 12, 13]))
handler.handle(bytes([14, 15, 0xe2, 0x80, 0xA9, 0xe2, 0x80, 1, 2, 3, 0xe2, 0x80, 0xA9]))

while handler.hasPackage():
    print(handler.getPackageAndNext())
