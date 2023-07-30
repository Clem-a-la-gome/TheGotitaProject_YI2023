# The pygate

These are the steps to configure your Pygate: 

## 1. Updating the firmware on the PyGate expansion board

You need to upload the firmware manually to this specific expansion board. A complete video on this topic can be found 
[here](https://www.youtube.com/watch?v=FkycTZvj-ss&t=615s&ab_channel=CoreElectronics).

You also have some resources concerning this topic on the Pycom official documentation [here](https://docs.pycom.io/updatefirmware/expansionboard/). There you can 
find the archives necessary for the updating of the device.

## 2. Udpating the firmware on the FiPy

The firmware of the Fipy can be uploaded manually like the PyGate, but there is another way much simpler. You just need to connect the Fipy to the Expansion board
and then use the updating software built by Pycom. This software can be found [here](https://docs.pycom.io/updatefirmware/device/), as the tutorial as well. 
If you need more information, I recommend you to check this [video](https://www.youtube.com/watch?v=TEfiMnkvyyM&t=188s&ab_channel=Pycom).

## 3. Assembling the Pygate

You need to assemble all the components:

- The shield A.K.A PyGate expansion board
- The microcontroller: it can be either a LoPy, LoPy 4 or a Fipy
- The Ethernet adapter (optional) if you want to power the PyGate by an ethernet cable
- The LoRa antenna - ⚠️ don't power on your device if the antenna is not connected as you might damage the LoPy
- The case

## 4. Configure the code

For this, you need to go to the (global_config.json)[./global_config.json] and set the EUI indicated at the end of the JSON file. The EUI it's a 64 bit extended unique identifier for each gateway. With Pycom products, what you can do is to use the 

You can use as EUI the 

## 5. Upload the files to the PyGate
