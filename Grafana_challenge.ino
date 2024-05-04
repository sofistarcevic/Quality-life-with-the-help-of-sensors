
#include <DallasTemperature.h>
#include <OneWire.h>
#include "DHT.h"

//TEMPERATURE
#define KY001 2     
OneWire one(KY001);
DallasTemperature sensors(&one);

//HUMIDITY
#define KY015 16
#define DHT1 DHT11
float humidity;
DHT dht11(KY015, DHT11);

//MICRO
#define KY037 32
float value_ky037;
float value_sonido_ant = 1.0f;

//LIGHT INTENSITY
#define KY018 33
int value_light = 0;

//RGB KY-009
#define blue 27
#define green 14
#define red 26
#define white 25


void setup() {
 Serial.begin(9600);
 sensors.begin();
 dht11.begin();
 pinMode(blue, OUTPUT);
 pinMode(green, OUTPUT);
 pinMode(red, OUTPUT);
}


void loop()
{
  Serial.println("-START-"); 
  

  //KY-001 TEMPERATURE:
  analogWrite(green, HIGH);
  sensors.requestTemperatures();
  if(sensors.getTempCByIndex(0)<0){
    Serial.println("\t Temperature sensor reading error");
  }else{
    Serial.print("Temperature: "); Serial.println(sensors.getTempCByIndex(0));
  }

  delay(200);
  analogWrite(green, LOW);

//KY-015 HUMIDITY:
  analogWrite(blue, HIGH);
  humidity = dht11.readHumidity();
  if (isnan(humidity)) {
    Serial.println("\t Humidity sensor reading error");
  }else{
    Serial.print("Humididy: "); Serial.println(humidity,1);
  }

  delay(200);
  analogWrite(blue, LOW);

//KY-037 MICRO:
  analogWrite(red, HIGH);
  value_ky037 = analogRead(KY037);
  float value_sonido = 20*log(value_ky037);   //in dB
  if(value_sonido<240 && value_sonido>0){
    value_sonido_ant = value_sonido;
  }
  Serial.print("Sound: "); Serial.println(value_sonido_ant);

  delay(200);
  analogWrite(red, LOW);

//KY-018 LIGHT INTENSITY:
  analogWrite(white, HIGH);
  value_light = analogRead(KY018);
  int value_inverted = 4096-value_light;
  Serial.print("Light_Intensity: "); Serial.println(value_inverted, DEC);

  delay(200);
  analogWrite(white, LOW);


  Serial.println("-END-"); 

  delay(1500);
  
}