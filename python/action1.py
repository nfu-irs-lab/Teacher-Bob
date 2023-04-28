#!/usr/bin/env python
# -*- coding: utf-8 -*-

#
# read_write.py
#
#  Created on: 2016. 6. 16.
#      Author: Ryu Woon Jung (Leon)
#

#
# *********     Read and Write Example      *********
#
#
# Available DXL model on this example : All models using Protocol 1.0
# This example is designed for using a Dynamixel MX-28, and an USB2DYNAMIXEL.
# To use another Dynamixel model, such as X series, see their details in E-Manual(support.robotis.com) and edit below variables yourself.
# Be sure that Dynamixel MX properties are already set as ## ID : 1 / Baudnum : 1 (Baudrate : 1000000 [1M])
#

import os, sys
import time
from typing import List

if os.name == 'nt':
    import msvcrt


    def getch():
        return msvcrt.getch().decode()
else:
    import tty, termios

    fd = sys.stdin.fileno()
    old_settings = termios.tcgetattr(fd)
    tty.setraw(sys.stdin.fileno())


    def getch():
        return sys.stdin.read(1)

# os.sys.path.append('../dynamixel_functions_py')             # Path setting

from dynamixel_sdk import *  # Uses DYNAMIXEL SDK library

# Control table address
ADDR_MX_TORQUE_ENABLE = 24  # Control table address is different in Dynamixel model
ADDR_MX_GOAL_POSITION = 30
ADDR_MX_PRESENT_POSITION = 36

# Protocol version
PROTOCOL_VERSION = 1  # See which protocol version is used in the Dynamixel

# Default setting
DXL_ID = 3  # Dynamixel ID: 1
DEVICENAME = "COM3"  # Check which port is being used on your controller
# ex) Windows: "COM1"   Linux: "/dev/ttyUSB0"

TORQUE_ENABLE = 1  # Value for enabling the torque
TORQUE_DISABLE = 0  # Value for disabling the torque
DXL_MINIMUM_POSITION_VALUE = 100  # Dynamixel will rotate between this value
DXL_MAXIMUM_POSITION_VALUE = 4000  # and this value (note that the Dynamixel would not move when the position value is out of movable range. Check e-manual about the range of the Dynamixel you use.)
DXL_MOVING_STATUS_THRESHOLD = 10  # Dynamixel moving status threshold

ESC_ASCII_VALUE = 0x1b

COMM_SUCCESS = 0  # Communication Success result value
COMM_TX_FAIL = -1001  # Communication Tx Failed

# Initialize PortHandler Structs
# Set the port path
# Get methods and members of PortHandlerLinux or PortHandlerWindows
porthandler = PortHandler(DEVICENAME)

# Initialize PacketHandler Structs
packetHandler1 = PacketHandler(1.0)
# packetHandler2 = PacketHandler(2.0)

index = 0
dxl_comm_result = COMM_TX_FAIL  # Communication result
dxl_goal_position: List[int] = [DXL_MINIMUM_POSITION_VALUE, DXL_MAXIMUM_POSITION_VALUE]  # Goal position

dxl_error = 0  # Dynamixel error
dxl_present_position = 0  # Present position

# Open port
if porthandler.openPort():
    print("Succeeded to open the port!")
else:
    print("Failed to open the port!")
    print("Press any key to terminate...")
    msvcrt.getch()
    quit()

# Set port baudrate
baudrate = 1000000
if porthandler.setBaudRate(baudrate):
    print("Succeeded to change the baudrate!")
else:
    print("Failed to change the baudrate!")
    print("Press any key to terminate...")
    msvcrt.getch()
    quit()

# Enable Dynamixel Torque
packetHandler1.write1ByteTxRx(porthandler, DXL_ID, 24, 1)
# if packetHandler1.getLastTxRxResult(dxl_comm_result, PROTOCOL_VERSION) != COMM_SUCCESS:
#     packetHandler1.printTxRxResult(PROTOCOL_VERSION, packetHandler1.getLastTxRxResult(dxl_comm_result, PROTOCOL_VERSION))
# elif packetHandler1.getLastRxPacketError(dxl_error, PROTOCOL_VERSION) != 0:
#     packetHandler1.printRxPacketError(PROTOCOL_VERSION, packetHandler1.getLastRxPacketError(dxl_error, PROTOCOL_VERSION))
# else:
#     print("Dynamixel has been successfully connected")


while 1:
    # Write goal position
    packetHandler1.write2ByteTxRx(porthandler, DXL_ID, 30, 512)
    time.sleep(1)
    packetHandler1.write2ByteTxRx(porthandler, DXL_ID, 30, 1019)
    time.sleep(1)


# Close port
porthandler.closePort()
