import json
import socket
from typing import List

import cv2

from net.tcp_handler import PackageHandler
from visual.detector.concrete.face_detect_deepface import FaceDetector
from visual.detector.concrete.object_detect_yolov5 import ObjectDetector
from visual.detector.framework.detector import DetectorData
from visual.monitor.concrete.crt_camera import CameraMonitor
from visual.monitor.framework.fw_monitor import CameraListener
from visual.utils.visual_utils import annotateLabel

EOP = bytes([0xe2, 0x80, 0xA9]).decode('utf-8')

CMD_OBJECT_DETECTOR = "OBJECT_DETECTOR "
CMD_FACE_DETECTOR = "FACE_DETECTOR "

ID_OBJECT = 1
ID_FACE = 2


class Listener(CameraListener):

    def __init__(self, handler: PackageHandler, client: socket):
        self.client = client
        self.handler = handler

    def onDetect(self, _id, image, data: List[DetectorData]):
        l: List = []
        if _id == 1:
            # 辨識到物品時
            for d in data:
                l.append(d.result)
                annotateLabel(image, d.x, d.y, d.width, d.height, d.result['name'])

            cv2.imshow("r", image)
            s = json.dumps(l)
            print(s)
            self.client.send(self.handler.convertToPackage(s.encode(encoding='utf-8')))

        elif _id == 2:
            # 辨識到臉部時
            for d in data:
                l.append(d.result)
                annotateLabel(image, d.x, d.y, d.width, d.height, d.result['emotion'])

            cv2.imshow("r", image)
            s = json.dumps(l)
            print(s)
            self.client.send(self.handler.convertToPackage(s.encode(encoding='utf-8')))

    def onNothingDetected(self, _id, image):
        cv2.imshow("r", image)

    def onImageRead(self, image):
        pass


class MainProgram:
    def __init__(self):
        self.server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server.bind(("0.0.0.0", 4444))
        self.server.listen(5)
        self.handler = PackageHandler()
        self.monitor = CameraMonitor(0, 1)
        self.monitor.registerDetector(ObjectDetector(1, 0.5), False)
        self.monitor.registerDetector(FaceDetector(2), False)

    def run(self):
        self.monitor.start()
        while True:
            client, address = self.server.accept()
            self.monitor.setListener(Listener(self.handler, client))
            print("Connected:", address)
            try:
                while True:
                    data = client.recv(4096)
                    self.handler.handle(data)
                    while self.handler.hasPackage():
                        package = self.handler.getPackageAndNext()
                        command = package.decode(encoding='utf-8')
                        print("command:", command)
                        self.handleCommand(command)

            except Exception as e:
                print(e.__str__())

    def handleCommand(self, command: str):
        if command.startswith(CMD_OBJECT_DETECTOR):
            if command[len(CMD_OBJECT_DETECTOR):] == "ENABLE":
                self.monitor.setDetectorEnable(ID_OBJECT, True)
            elif command[len(CMD_OBJECT_DETECTOR):] == "DISABLE":
                self.monitor.setDetectorEnable(ID_OBJECT, False)

        elif command.startswith(CMD_FACE_DETECTOR):
            if command[len(CMD_FACE_DETECTOR):] == "ENABLE":
                self.monitor.setDetectorEnable(ID_FACE, True)
            elif command[len(CMD_FACE_DETECTOR):] == "DISABLE":
                self.monitor.setDetectorEnable(ID_FACE, False)


if __name__ == "__main__":
    main = MainProgram()
    main.run()
