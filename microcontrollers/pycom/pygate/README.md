# The pygate

These are the steps to configure your Pygate: 

## 1. Updating the firmware on the PyGate expansion board

You need to upload the firmware manually to this specific expansion board. A complete video on this topic can be found 
[here](https://www.youtube.com/watch?v=FkycTZvj-ss&t=615s&ab_channel=CoreElectronics).

You also have some resources concerning this topic on the Pycom official documentation [here](https://docs.pycom.io/updatefirmware/expansionboard/). There you can 
find the archives necessary for the updating of the device.

## 2. Udpating the firmware on the FiPy

The firmware of the Fipy can be uploaded manually like the PyGate, but there is another way much simpler. You just need to connect the Fipy to the Expansion board
and then use the updating software built by Pycom. This software can be found [here](https://docs.pycom.io/updatefirmware/device/), as well as the tutorial. 
If you need more information, I recommend you to check this [video](https://www.youtube.com/watch?v=TEfiMnkvyyM&t=188s&ab_channel=Pycom).

## 3. Assembling the Pygate

You need to assemble all the components:

- The shield A.K.A PyGate expansion board
- The microcontroller: it can be either a LoPy, LoPy 4 or a Fipy
- The Ethernet adapter (optional) if you want to power the PyGate by an ethernet cable - ⚠️ don't use the USB C port when using this methodology
- The LoRa antenna - ⚠️ don't power on your device if the antenna is not connected as you might damage the LoPy
- The case

## 4. Configure the code

First of all, you need to configure your Gateway. For this, you need to go to the [global_config.json](./global_config.json) and set the EUI indicated at the end of the JSON file. The EUI it's a 64 bit extended unique identifier for each gateway. There is a complete explanation [here](https://hackmd.io/@sMJAvvKqQ6OQ7Y1uLK8WYQ/S1dhsfIp_#My-own-LoRa-gateway) on how to obtain a unique EUI identifier for your gateway using your pycom device.

The last step is to configure the settings of the wifi. Change the SSID (Name) and the Password to your own wifi settings in [main.py](./main.py).

## 5. Upload the files to the PyGate
