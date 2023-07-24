# Librerias estandar de pycom
import pycom
import utime
import machine
from machine import ADC
from machine import Pin

# Librerias proporcionadas por los fabricantes
from DFRobot_PH import DFRobot_PH
from DFRobot_EC import DFRobot_EC
from DFRobot_DO import DFRobot_DO
from onewire import DS18X20
from onewire import OneWire

# create an ADC object bits=10 means range 0-1024
adc = ADC(bits=10)

# Llamando Librerias de los fabricantes
dfr_ph = DFRobot_PH()
dfr_ec = DFRobot_EC()


#Pines conectados a sensores
ow = OneWire(Pin('P23')) # Pin sensor DS18B20
# create an ADC object bits=10 means range 0-1024
adc = ADC(bits=10)
# apin_DO = adc.channel(attn=ADC.ATTN_11DB, pin='P17') # Pin sensor DO, solo disponibles con LoPy4
# apin_T = adc.channel(attn=ADC.ATTN_11DB, pin='P15') # Pin sensor Turbidez, solo disponibles con LoPy4
apin_EC = adc.channel(attn=ADC.ATTN_11DB, pin='P14') # Pin sensor EC
apin_PH = adc.channel(attn=ADC.ATTN_11DB, pin='P13') # Pin sensor PH

temp_v = DS18X20(ow)
dfr_ec.begin()
dfr_ph.begin()

def values():

    #Calculo de temperatura a partir de libreria
    temp = temp_v.read_temp_async()
    temp_v.start_conversion()
    if temp == None:
        temp = 25
    utime.sleep(1)

    # Lee los voltajes de entrada de los sensores
    volt_PH = apin_PH.voltage()*3.2/2.2 # Voltaje de pH
    volt_EC = apin_EC.voltage()*3.2/2.2  # Voltaje de EC
    # volt_T = apin_T.voltage() # Voltaje de turbidez
    # volt_DO = apin_DO.voltage() # Voltaje de oxigeno disuelto

    #Calcula valor de variables con voltaje de entrada a partir de librerias
    ec = dfr_ec.readEC(volt_EC,temp) # Valor de ec
    ph = dfr_ph.read_PH(volt_PH,temp) # Valor de ph
    # do = do.readDO(volt_DO,temp_read) # Valor de oxigeno disuelto

    #Calculo de Turbidez con voltaje
    # turb = -1120.4*square(volt_T)+5742.3*t_v-4353.8

    return(ec, ph, temp)
