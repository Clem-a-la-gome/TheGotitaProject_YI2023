'''!
  @author Marcos Torres Romero
  @url https://idus.us.es/bitstream/handle/11441/128794/TFM-2219-TORRES%20ROMERO.pdf?sequence=1&isAllowed=y
'''

import time
import sys
#Valores de calibración, modificar aquí
_do_air_cal_Voltage = 596.7682
_cal_temperature = 19.19373
#Constante, no modificar
_do_table = [14460, 14220, 13820, 13440, 13090, 12740, 12420, 12110, 11810, 11530,
 11260, 11010, 10770, 10530, 10300, 10080, 9860, 9660, 9460, 9270,
 9080, 8900, 8730, 8570, 8410, 8250, 8110, 7960, 7820, 7690,
 7560, 7430, 7300, 7180, 7070, 6950, 6840, 6730, 6630, 6530, 6410]

class DFRobot_DO():

    def readDO(self,voltage,temperature):

        global _cal_temperature
        global _do_air_cal_Voltage
        global _do_table

        temperature=int(round(temperature,0)) #Redondeo y elimino decimales
        V_saturation=_do_air_cal_Voltage+35*temperature-35*_cal_temperature
        _doValue=voltage*_do_table[temperature]/V_saturation

        return _doValue/1000
