# The Gotita Project - Young Innovators 2023

This repository has been made for the 2023 young innovator scholarship given by the Colombian ministry of science. My ambition is to create a water quality monitoring system for rural isolated zones.

## Problem Statement

In 2017, an estimated of 1.2 million people died as a result of unsafe water sources. This was 2.2% of global deaths.

For this reason, multiples NGOs are now trying to improve this aspect and improve life quality of those who lived in undeserved areas. Nevertheless, there are too much challenges that WASH units are facing now.

In Colombia 1.2 million of people have no access to clean and safe water and 150 children are dying per year because of diarrhoea. There are 391 municipalities already at risk of water shortages. Chocó, Huila, Nariño and Bolívar are 4 departments that have been recently in maximum alert. Since the use of water treatment at the household level and its adequate storage is very widespread and can be in remote, dispersed, difficult to access and difficult to manage areas, it is difficult to monitor the correct operation and maintenance.

For this, we need to ensure the water quality of the source and the distribution point after treament.

## Proposal for the young innovator scholarship of 2023

The idea is to measure variables of water quality and aloud the user to visualize data and have an historic of the water quality with an online data base. 

To collect data, we will use electronic sensors that will measure water quality variables. Measures will then be sent through LoRaWAN protocole to TheThingsNetwork platform where data will be stored. After having the data stored in the platform, we will use an API to connect it with another app or web site to visualize the data.

**Measured variables:**
- Ph
- Temperature
- Water Level
- Turbidity
- Conduction
- Dissolved Oxygen

To transmit the data, each device will communicate with our Raspberry Pi gateway through LoRa radiofrequency. This RaspberryPi will be installed in one of the NGO's offices with WiFi accessibility. In case the nearest office doesn't have WiFi connection or is too far, we can relocate our gateway to a functional location and use a sim card module instead, to connect the gateway to a mobile network.

## License 

This repository is under [MIT License](https://github.com/clem-gh/TheGotitaProject_YI2023/blob/main/LICENSE.md).
