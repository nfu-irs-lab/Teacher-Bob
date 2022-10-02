from typing import List

import cv2

from visual.detector.concrete.face_detect_deepface import FaceDetector
from visual.detector.concrete.object_detect_yolov5 import ObjectDetector
from visual.detector.framework.detector import DetectorData
from visual.monitor.concrete.crt_camera import CameraMonitor
from visual.monitor.framework.fw_monitor import CameraListener
from visual.utils import visual_utils

FACE_DETECTOR_ID = 1
OBJECT_DETECTOR_ID = 2


class TestListener(CameraListener):
    def onImageRead(self, image):
        # cv2.imshow("result", image)
        pass

    def onDetect(self, detector_id, image, data_list: List[DetectorData]):
        labeledImage = image.copy()
        if detector_id == FACE_DETECTOR_ID:
            for data in data_list:
                label = data.result['emotion'] + str(data.result['age']) + data.result['gender']
                visual_utils.annotateLabel(labeledImage,
                                           data.x, data.y,
                                           data.width, data.height,
                                           label,
                                           overwrite=True)
            cv2.imshow("face", labeledImage)

        elif detector_id == OBJECT_DETECTOR_ID:
            for data in data_list:
                label = data.result['name'] + " " + str(round(data.result['conf'], 2))
                visual_utils.annotateLabel(labeledImage,
                                           data.x, data.y,
                                           data.width, data.height,
                                           label,
                                           overwrite=True)
            cv2.imshow("object", labeledImage)



if __name__ == '__main__':
    monitor = CameraMonitor(0)
    monitor.registerDetector(FaceDetector(FACE_DETECTOR_ID), False)
    monitor.registerDetector(ObjectDetector(OBJECT_DETECTOR_ID), False)
    monitor.setDetectorEnable(FACE_DETECTOR_ID, True)
    monitor.setDetectorEnable(OBJECT_DETECTOR_ID, True)

    monitor.setListener(TestListener())
    monitor.start()
