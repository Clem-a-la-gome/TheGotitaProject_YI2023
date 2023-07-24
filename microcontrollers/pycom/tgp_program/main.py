'''
    TGP software
    Author: clem-gh
    Date:   2023.7
    https://the-gotita-project-10b7c.web.app/

    =======================================

    INSTRUCTIONS
    1. Go to config.json to set the parameters of your TTN gateway.
    2. Check the RF in the lora file, if needed, change it to the one
    of your region.
    3. Connect VCC to Vin (it needs 5V).
    4. Connect sensor pins as described in the sensors.py file.

    WARNINGS
    1. Using a different RF than the one authorized in your
    region can damage your device.
    2. Don't use the 5V output from your sensors as you can damage the
    Pycom board, instead use voltage divider to reduce max V. to 3.3V.
    3. Check connections.
    4. Check LoRa Antenna connections.

'''

# Librerias estandar de pycom
import sys # Libreria para
import utime # Libreria para el uso de funciones de tiempo
import pycom # Libreria para el uso de funciones pycom
import machine # Libreria para el uso de los microcontroladores
import ubinascii #
from machine import ADC # Importe de la funcion Analog to Digital Converter
from machine import Pin, I2C # Importe de la funcion Pin para usar los pines
import ustruct
from LCD1602 import LCD1602

# Importe de archivos propios
import sensors # Contiene funcion para obtener los valores de los sensores
import lora # Contiene la funcion para conectar a LoRa y TTN
lora.connect_lora() # Conexion a LoRaWAN
# Advertencia: Primero se debe conectar a Lora antes de importar el 'socket'
from lora import s # Importa el 'socket' del archivo lora

# Configuracion de pines de automatizacion
adc = ADC(bits=10) # Objeto ADC de bits=10: rango de 0-1024
apin_L = adc.channel(attn=ADC.ATTN_11DB, pin='P16') # Sensor analogo de nivel
relay_pin_1 = Pin('P3', mode=Pin.OUT) # Pin relay superior
#Pin 11 en 0 abre rele superior, en 1 cierra rele superior
relay_pin_2 = Pin('P4', mode=Pin.OUT) # Pin relay inferior
#Pin 12 en 0 abre rele inferior, 1 cierra rele inferior

# Configuracion del LCD
sda = 'P9'
scl = 'P10'
i2c = I2C(1, pins=(sda, scl))
LCD = LCD1602(i2c)

# Estado incial del microcontrolador
state = int(0) # Establece que el estado incial es 0
tk = False #  Token estado del tiempo: True 'Tiempo en uso' False 'Tiempo en desuso'
send_value = False

pycom.heartbeat(False)

while True: # Loop infinito

    lvl=apin_L.voltage() # Calcula el diferencial del sensor de nivel

    #Estado Inicial: Valvula superior abierta, valvula inferior cerrada
    relay_pin_1.value(0) # Relay superior abierto
    relay_pin_2.value(1) # Relay inferior cerrado

    current_time = utime.ticks_ms()

    if state == 0:
        if lvl <= 1500:
            # Etaba 1 (Inicial): Entra agua al sistema
            relay_pin_1.value(0) # Relay superior abierto
            relay_pin_2.value(1) # Relay inferior cerrado
            LCD.puts("Flujo entra...")
            print("Flujo entrando...")
        else:
            #Etapa 2: Se cierra la valvula y se miden variables durante 10s
            relay_pin_1. value(1) # Relay inferior cerrado
            print("Nivel de agua alcanzado... Cierre de valvula superior")
            LCD.puts("Nivel alcanzado")
            if send_value == False:
                for i in range(5): # Toma la quinta medicion
                    #ec, ph, do, temp, turb = sensors.values()
                    ec, ph, temp = sensors.values()
                    ec = ec*100
                    ph = ph*10
                    temp = temp*10
                    print("EC: %d" %(ec*100))
                    print("pH: %d" %(ph*100))
                    print("T: %d" %(temp*10))
                    if i == 4:
                        send_value = True
            else:
                #/---------/ Se envian valores a TTN /-------------/

                #package = ustruck.pack('>h',int(ec)) + ustruct.pack('>h',int(ph)) + ustruct.pack('>h',int(do)) + ustruct.pack('>h',int(temp)) + ustruct.pack('>h',int(turb))
                package = ustruct.pack('>h', int(temp)) +  ustruct.pack('>h', int(ec)) +  ustruct.pack('>h', int(ph))
                s.send(package)
                print("Paquete de carga enviado: T %d" %(temp))
                print("Paquete de carga enviado: EC %d" %(ec))
                print("Paquete de carga enviado: pH %d" %(ph))

                LCD.puts("Paquete enviado")
                print("Mediciones terminadas...")
                state = int(1) # Indica el siguiente estado del programa
                tk = False # No se puede usar el cronometro de la etapa 2
                send_value = False

    elif state == 1:
        # Etapa 3: El agua se evacua durante 10s.
        print("Evacuacion del agua... Apertura de la valvula inferior")
        LCD.puts("Evacua agua")
        relay_pin_2.value(0) # Relay inferior abierto
        relay_pin_1.value(1) # Relay superior cerrado
        if tk == False:
            start_time = current_time # Guarda el instante que la etapa 3 comenzo
            tk = True # Se puede usar el cronometro de la etapa 3
            print("Comienza Cronometro")
        else:
            time_elapsed=utime.ticks_diff(current_time, start_time) # Hace funcion de cronometro
            print("Cronometro: %d ms... Evacuando Agua." %(time_elapsed))
            if time_elapsed >= 10000: # Se pasa a la siguiente etapa despues de 10s
                state = 2 # Indica el siguiente estado del programa
                tk = False # No se puede usar el cronometro de la etapa 3
                print("Sistema vacio...")
    else:
        # Etapa 4: El dispositivo queda en reposo por 15 min
        print("Dispositivo en reposo durante 30s...")
        LCD.backlight(0)
        LCD.clear()
        state = 0 # El estado vuelve al incial
        relay_pin_2.value(1) # Relay inferior cerrado
        relay_pin_1.value(1) # Relay superior cerrado
        utime.sleep(30) # Dispositivo queda en reposo por ... s

    utime.sleep(1) # Las operaciones se repiten cada segundo
