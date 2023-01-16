int ThermistorPin = 0; //Pin donde se obtiene el valor de salida del termistor
int Vo;
float R1 = 10000; //Resistencia de referencia del termistor
float logR2, R2, T;

void setup() 
{
Serial.begin(9600);
}

void loop() {

  Vo = analogRead(ThermistorPin); // Voltaje de salida del termistor
  R2 = 10 * R1 * ((1023.0 / (float)Vo) - 1.0); // Calculo de la resistencia de salida
  logR2 = log(R2);
  T = 279.22 - 27.92*logR2; //Ecuacion caracteristica obtenida en el laboratorio 1

  
  Serial.println(T);
  delay(500);
  
}