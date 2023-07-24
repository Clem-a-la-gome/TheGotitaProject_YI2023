int water_ain=A0;
int relay_1 = 2;
int relay_2 = 7;

float ad_value_c=0;
float ad_value=0;

float state = 0;

bool tk = false;

unsigned long previousMillis = 0;

void setup() {
  // put your setup code here, to run once:
  pinMode(relay_1, OUTPUT); // Configurar relay como salida o OUTPUT
  pinMode(relay_2, OUTPUT); // Configurar relay como salida o OUTPUT
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  ad_value=analogRead(water_ain);
  ad_value_c = ad_value*5/1024;
  Serial.println(ad_value_c);

  unsigned long currentMillis = millis();

  if (state == 0)
  {
    if(ad_value <= 380)
    {
      //Serial.print("Paso");
      // Etapa 1 (Inicial): Entra agua al sistema
      digitalWrite(relay_1, LOW); // Rele superior esta abierto, hay flujo
      digitalWrite(relay_2, HIGH); // Rele inferior esta cerrado, no hay flujo
    } 
    else 
    {
      digitalWrite(relay_1, HIGH); // Rele superior esta cerrado, no hay flujo
      if (tk == false)
      {
        previousMillis = currentMillis; // Se guarda tiempo de estado 1
        tk=true; // Se activa token, se guardo el tiempo
      }
      else
      {
        Serial.println(currentMillis - previousMillis);
        if(currentMillis - previousMillis >= 10000)
        {
          state=1; // Pasa a estado 2
          tk=false; // Borra Tiempo
        }
      }
    }
  }
  else
  {
    digitalWrite(relay_2, LOW); // Rele inferior esta abierto, hay flujo
    if(tk == false)
    {
      previousMillis = currentMillis; // Se guarda tiempo de estado 1
      tk=true; // Se activa token, se guardo el tiempo
    }
    else
    {
      Serial.println(currentMillis - previousMillis);
      if(currentMillis - previousMillis >= 5000) // Arduino Duerme durante 5s
        {
          state=0; // Pasa a estado 2
          tk=false; // Borra Tiempo
        }
    }
  }

  Serial.print("El estado es: ");
  Serial.println(state);

  delay(500);  
}
