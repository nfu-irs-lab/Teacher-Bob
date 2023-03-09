import abc


class DynamixelServo(abc.ABC):

    def __init__(self, servoId: int, protocol: int):
        self._servoId = servoId
        self._protocol = protocol

    def getId(self):
        return self._servoId

    def getProtocol(self):
        return self._protocol

    @abc.abstractmethod
    def getGoalPositionAddressLength(self):
        pass

    @abc.abstractmethod
    def getPresentPositionAddressLength(self):
        pass

    @abc.abstractmethod
    def getGoalVelocityAddressLength(self):
        pass

    @abc.abstractmethod
    def getTorqueEnableAddressLength(self):
        pass

    @abc.abstractmethod
    def getMovingAddressLength(self):
        pass

    # @abc.abstractmethod
    # def position_to_angle(self, position: int):
    #     pass
    #
    # @abc.abstractmethod
    # def angle_to_position(self, angle: float):
    #     pass

    # @abc.abstractmethod
    # def getToqueLimitAddress(self):
    #     pass
