import sys
import utime
import pycom
import machine
from machine import ADC
from machine import Pin

relay_pin_2 = Pin('P4', mode=Pin.OUT) # Pin relay inferiorimpo
relay_pin_1 = Pin('P3', mode=Pin.OUT) # Pin relay inferiorimpo

relay_pin_1.value(1)
relay_pin_2.value(0)

#Pin 11 en 0 abre rele superior
#Pin 11 en 1 cierra rele superior

#Pin 12 en 0 abre rele inferior
#Pin 12 en 1 cierra rele inferior
