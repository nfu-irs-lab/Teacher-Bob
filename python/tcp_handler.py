from typing import List

EOP = bytes([0xe2, 0x80, 0xA9])


class PackageHandler:
    def __init__(self, EndOfLine: bytes = EOP):
        self.__EOL = EndOfLine
        self.buffer = bytearray()
        self.delay_timer = 0
        self.packages: List[bytes] = []

    def handle(self, data: bytes):
        for b in data:
            self.buffer.append(b)

        indexOfFirstEOL = self.__getIndexOfFirstEOL(self.buffer)
        while indexOfFirstEOL != -1:
            # remove \n,add to packages array.
            self.packages.append(self.buffer[0:indexOfFirstEOL])

            # remove from content to \n in buffer.
            del self.buffer[0:indexOfFirstEOL + len(self.__EOL)]
            indexOfFirstEOL = self.__getIndexOfFirstEOL(self.buffer)

    def hasPackage(self) -> bool:
        return len(self.packages) > 0

    def getPackageAndNext(self) -> bytes:
        if self.hasPackage():
            b = self.packages[0]
            del self.packages[0]
            return b
        else:
            raise RuntimeError("No package")

    def __getIndexOfFirstEOL(self, data):
        for i in range(0, len(data)):
            found = 0
            for j in range(0, len(self.__EOL)):
                if i + j < len(data):
                    a = self.__EOL[j]
                    b = data[i + j]
                    if b == a:
                        found += 1
            if found == len(self.__EOL):
                return i
        return -1
