from network import LoRa # Libre
import socket
import time
import ubinascii
import pycom
import json
pycom.heartbeat(False)

# Initialise LoRa in LORAWAN mode.
# Please pick the region that matches where you are using the device:
# Asia = LoRa.AS923
# Australia = LoRa.AU915
# Europe = LoRa.EU868
# United States = LoRa.US915
lora = LoRa(mode=LoRa.LORAWAN, region=LoRa.US915)

with open('config.json') as f:
    config = json.load(f)

# create an OTAA authentication parameters, change them to the provided credentials
app_eui = ubinascii.unhexlify(config['APP_EUI'])
app_key = ubinascii.unhexlify(config['APP_KEY'])
#uncomment to use LoRaWAN application provided dev_eui
dev_eui = ubinascii.unhexlify(config['DEV_EUI'])

#Uncomment for US915 / AU915 & Pygate
for i in range(0,8):
     lora.remove_channel(i)
for i in range(16,65):
    lora.remove_channel(i)
for i in range(66,72):
    lora.remove_channel(i)

def connect_lora():
    # join a network using OTAA (Over the Air Activation)
    lora.join(activation=LoRa.OTAA, auth=(dev_eui, app_eui, app_key), timeout=0)
    while not lora.has_joined():
        time.sleep(2.5)
        print('Not yet joined...')

    print('Joined')
    pycom.rgbled(0xffd7000)
    for n in range(3):
        pycom.rgbled(0x2bff00)
        time.sleep(1)
        pycom.rgbled(0x000000)
        time.sleep(0.5)

    # create a LoRa socket
    global s
    s = socket.socket(socket.AF_LORA, socket.SOCK_RAW)

    # set the LoRaWAN data rate
    s.setsockopt(socket.SOL_LORA, socket.SO_DR, 4)
