#include <SoftwareSerial.h>

SoftwareSerial BTSerial(12, 13); //Connect HC-06. Use your (TX, RX) settings
const int joystick_x = A0;    
const int joystick_y = A1;
const int joystick_A = 2;
const int joystick_B = 3;
const int joystick_C = 4;
const int joystick_D = 5;
const int joystick_E = 6;
const int joystick_F = 7;
int sum;
int A, B, Au, Bu, u;
int button_chk;
int tmp;
int cnt;

void setup()  
{
  pinMode ( joystick_A, INPUT_PULLUP );
  pinMode ( joystick_B, INPUT_PULLUP );
  pinMode ( joystick_C, INPUT_PULLUP );
  pinMode ( joystick_D, INPUT_PULLUP );
  pinMode ( joystick_E, INPUT_PULLUP );
  pinMode ( joystick_F, INPUT_PULLUP );
  Serial.begin(9600);
  Serial.println("Hello!");
  BTSerial.begin(9600);  // set the data rate for the BT port
  button_chk = 0;
  cnt = 0;
}

void loop()
{
  // BT –> Data –> Serial
//  if (BTSerial.available()) {
//    /*
//    
//    Serial.write(BTSerial.read());
//    */
//  }
//  // Serial –> Data –> BT
  sum = 0;
  sum = !digitalRead(joystick_A) << 1;
  sum = (sum + !digitalRead(joystick_B)) << 1;
  sum = (sum + !digitalRead(joystick_C)) << 1;
  sum = (sum + !digitalRead(joystick_D)) << 1;
  sum = (sum + !digitalRead(joystick_E)) << 1;
  sum = (sum + !digitalRead(joystick_F));
  if (sum == tmp) {
    button_chk = 0;
  }
  else {
    tmp = sum;
    if (tmp) {
      button_chk = 1;
    }
    else {
      button_chk = 0;
    }
  }
  A = map(analogRead(joystick_x), 0, 1023, -127, 127);
  B = map(analogRead(joystick_y), 0, 1023, -127, 127);
  u = (A*A+B*B) >> 5;
  if (button_chk || u) {
    Au = ((A+8) >> 4);
    Bu = ((B+8) >> 4);
    BTSerial.write(sum);
    BTSerial.write(Au + 127);
    BTSerial.write(Bu + 127);
    delay(1);
    Serial.println(Au);
    Serial.println(Bu);
    Serial.println(sum);
    Serial.println( 400 - (u >> 2));
//    delay ( 400 - (u >> 2));
    delay(10);
    cnt += 1;
    if (cnt >= 15) {
      cnt = 0;
      delay(130);
    }
  
  }
}
