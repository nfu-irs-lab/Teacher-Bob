import csv
import json
import re
import socket
import time
from typing import List

import cv2
from serial.tools.list_ports_linux import comports

from communication.concrete.crt_comm import TCPCommDevice, EOLPackageHandler, SerialServerDevice, TCPServerDevice
from communication.framework.fw_comm import CommDevice, ReConnectableDevice
from robot.concrete.crt_dynamixel import Dynamixel
from robot.concrete.servo_utils import CSVServoAgent
from visual.detector.concrete.object_detect_yolov5 import ObjectDetector
from visual.detector.concrete.face_detect_deepface import FaceDetector
from visual.detector.framework.detector import DetectorData
from visual.monitor.concrete.crt_camera import CameraMonitor
from visual.monitor.framework.fw_monitor import CameraListener
from visual.utils.visual_utils import annotateLabel

# 藍芽HC-05模組 UART/USB轉接器晶片名稱(使用正規表達式)
bt_description = ".*CP2102.*"
# 機器人 UART/USB轉接器晶片名稱(使用正規表達式)
bot_description = ".*FT232R.*"

CMD_OBJECT_DETECTOR = "OBJECT_DETECTOR "
CMD_FACE_DETECTOR = "FACE_DETECTOR "

VOL = 4000

ID_OBJECT = 1
ID_FACE = 2

DEBUG = True


class Listener(CameraListener):

    def __init__(self, commDevice: CommDevice):
        self.commDevice = commDevice

    def onDetect(self, _id, image, data: List[DetectorData]):
        l: List = []
        if _id == ID_OBJECT:
            cv2.putText(image, "Object Detector", (40, 40), cv2.cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2,
                        cv2.LINE_AA)
            # 辨識到物品時
            for d in data:
                # 將dict放到list中
                l.append(d.result)
                # 標記圖片上的辨識結果
                annotateLabel(image, d.x, d.y, d.width, d.height, d.result['name'])
            # 顯示圖片
            cv2.imshow("r", image)
            # 將dict轉成json字串
            s = json.dumps(l)
            self.sendString(s)

        elif _id == ID_FACE:
            cv2.putText(image, "Face Detector", (40, 40), cv2.cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
            # 辨識到臉部時
            for d in data:
                # 將dict放到list中
                l.append(d.result)
                # 標記圖片上的辨識結果
                annotateLabel(image, d.x, d.y, d.width, d.height, d.result['emotion'])

            # 顯示圖片
            cv2.imshow("r", image)
            s = json.dumps(l)
            self.sendString(s)

    def sendString(self, string: str):
        # 發送字串

        print(string)
        try:
            self.commDevice.write(string.encode(encoding='utf-8'))
        except Exception as e:
            print(e.__str__())

    def onNothingDetected(self, _id, image):
        cv2.imshow("r", image)

    def onImageRead(self, image):
        cv2.putText(image, "No Detector", (40, 40), cv2.cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
        cv2.imshow("r", image)


class MainProgram:
    def __init__(self):
        self.device = self.initialize_device()

        # monitor為相機監控器
        self.monitor = self.initialize_monitor()
        if not DEBUG:
            # robot為伺服馬達控制程式
            self.robot = self.initialize_robot()

    def initialize_monitor(self):
        # CameraMonitor第一個參數為裝置編號，選定使用的攝影機
        monitor = CameraMonitor(0, 1)
        # conf為物品辨識機率門檻值,門檻值以下的物品不會回傳
        conf = 0.5
        # 註冊物品辨識器到相機監聽器,預設不會開啟
        monitor.registerDetector(ObjectDetector(ID_OBJECT, conf), False)
        # 註冊臉部辨識器到相機監聽器,預設不會開啟
        monitor.registerDetector(FaceDetector(ID_FACE), False)
        return monitor

    def initialize_device(self) -> ReConnectableDevice:
        # 使用TCP傳輸
        return TCPServerDevice("0.0.0.0", 4444, EOLPackageHandler())

        # 使用藍芽傳輸
        # return BluetoothServerDevice(EOLPackageHandler())

        # Using HC-05
        # return SerialServerDevice(getSerialNameByDescription(bt_description), 38400, EOLPackageHandler())

    def initialize_robot(self):
        robot = Dynamixel(self.getSerialNameByDescription(bot_description), 115200)
        # 透過agent匯入伺服馬達
        agent = CSVServoAgent("servos.csv")
        for servo in agent.getDefinedServos():
            # 將馬達匯入至robot中
            robot.appendServo(servo)
        return robot

    def run(self):
        self.monitor.start()
        if not DEBUG:
            # 開啟機器人
            self.robot.open()
            for _id in self.robot.getAllServosId():
                print(_id, ":", self.robot.ping(_id))
        print("Communication Device is ready")
        while True:
            address, status, commDevice = self.device.accept()
            print(address, "is", status)
            try:
                self.monitor.setListener(Listener(commDevice))
                while True:
                    data = commDevice.read()
                    if data is None:
                        time.sleep(0.001)
                        continue
                    else:
                        command = data.decode(encoding='utf-8')
                        self.handleCommand(command, commDevice)

            except Exception as e:
                print(e.__str__())
                self.monitor.setDetectorEnable(ID_OBJECT, False)
                self.monitor.setDetectorEnable(ID_FACE, False)

    def interrupt(self):
        if not DEBUG:
            self.robot.close()
        self.monitor.stop()

    def handleCommand(self, command: str, commDevice: CommDevice):
        # 處理TCP指令
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
        elif command.startswith("ROBOT_DO "):
            csv_file = command[len("ROBOT_DO "):]
            try:
                if not DEBUG:
                    self.doRobotAction(csv_file)
            except Exception as e:
                print(e.__str__())

        # elif command == "ROBOT_LEG FORWARD":
        #     self.leg_forward()
        # elif command == "ROBOT_LEG STOP":
        #     self.leg_stop()

    def getSerialNameByDescription(self, description: str):
        for port in comports():
            if re.search(description, port.description):
                return port.device
        raise Exception(description + " not found.")

    def doRobotAction(self, csv_file):
        with open(csv_file, newline='') as file:
            rows = csv.reader(file, delimiter=",")
            line = 0
            for row in rows:
                if line == 0:
                    pass
                else:
                    if len(row) == 0:
                        continue

                    servoId = row[0]
                    position = row[1]
                    speed = row[2]
                    delay = row[3]

                    if not delay == '':
                        time.sleep(float(delay))

                    if servoId == '':
                        continue

                    if not speed == '':
                        self.robot.setVelocity(int(servoId), int(speed))

                    if not position == '':
                        self.robot.setGoalPosition(int(servoId), int(position))
                line = line + 1

    # def leg_forward(self):
    #     self.right_ctl(-VOL)
    #     self.left_ctl(VOL)
    #
    # def leg_backward(self):
    #     self.right_ctl(VOL)
    #     self.left_ctl(-VOL)
    #
    # def leg_left(self):
    #     self.right_ctl(-VOL)
    #     self.left_ctl(-VOL)
    #
    # def leg_right(self):
    #     self.right_ctl(VOL)
    #     self.left_ctl(VOL)
    #
    # def leg_stop(self):
    #     self.left_ctl(0)
    #     self.right_ctl(0)
    #
    # def right_ctl(self, velocity: int):
    #     self.robot.enableTorque(12, True)
    #     self.robot.enableTorque(13, True)
    #     self.robot.setVelocity(12, velocity)
    #     self.robot.setVelocity(13, velocity)
    #
    # def left_ctl(self, velocity: int):
    #     self.robot.enableTorque(11, True)
    #     self.robot.enableTorque(14, True)
    #     self.robot.setVelocity(11, velocity)
    #     self.robot.setVelocity(14, velocity)


if __name__ == "__main__":
    main = MainProgram()
    try:
        main.run()
    except KeyboardInterrupt as e:
        print(e.__str__())
        main.interrupt()
