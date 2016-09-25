#include "mbed.h"
#include "Grove_LCD_RGB_Backlight.h"
#include "string" //ok
#include "Servo.h"

#define ID 01
#define TIMEOUT 15

using namespace std;

Timeout del;

int t=TIMEOUT, pin;
char c;
bool waiting=false, locked=true;
char str[16];


Grove_LCD_RGB_Backlight lcd(PB_9, PB_8);
InterruptIn button(PC_13); //user button
//InterruptIn cavo(PA_5); //cavo consistenza blocco
//AnalogOut buzzer(PC_0); //alarm
Servo servo(PC_7);

RawSerial pc(SERIAL_TX, SERIAL_RX);
//Serial gps(PA_9, PA_10);
void code();
void welcome();
void connected();
void id();
void timeout();
void clear();
void irq();
void unlock();
void enjoy();
void Rx_interrupt();
void Rx_null();
void itostr(int); //converte int in char[] *srt per lcd.print()
void stradd(string);

int main(){ 
pc.baud(115200);
//buzzer.write(0);
button.fall(&irq);
//cavo.fall(&alarm);
servo.calibrate(0.0005, 90.0);
servo.position(0.0);

while(1){
    }   
}

void welcome(){
    lcd.setRGB(0x00, 0x00, 0xff);
    lcd.print("Urbike");
    lcd.locate(0,1), lcd.print("wait for code...");
    del.detach();
    del.attach(&id, 2);
    return;
    }
    
void id(){
    pin = ((pin=rand())<0)?-pin:pin; // 5 cifre random selezionate a caso da un intero di n cifre? 
    itostr(pin%100000);
    stradd("code -->");
    lcd.clear(), lcd.locate(0,0), lcd.print(str);
    printf("{\"mode\":\"id\", \"value\":%d}\n", pin%100000);
    t=TIMEOUT;
    del.detach();
    del.attach(&timeout, .1);
    return;
    }
    
void timeout(){
    if (t==0){
        t=TIMEOUT;
        del.detach();
        del.attach(&clear, 2);
        return;
        }
    else {
        itostr(t);
        stradd("expires in ");
        lcd.locate(0,1), lcd.print(str);
        printf("{\"mode\":\"wait\"}\n");
        if(!waiting)
            pc.attach(&Rx_interrupt, Serial::RxIrq);
        t--;
        del.detach();
        del.attach(&timeout, 1);
        }
    }
    
void connected(){
    lcd.clear(), lcd.setRGB(0x00, 0xff, 0x00);                
    //lcd.print("connected");
    del.detach();
    del.attach(&unlock, 1);
    return;
    }
    
    
void unlock(){
    servo.position(0.0);
    lcd.locate(0,0), lcd.print("bike unlocked :)");
    del.detach();
    del.attach(&enjoy, 1);
    return;
    }
    
void enjoy(){
    servo.position(90.0);
    lcd.locate(0,1), lcd.print("enjoy your ride!");
    del.detach();
    del.attach(&clear, 4);
    return;
    }

void clear(){ 
    lcd.clear(), lcd.setRGB(0x00, 0x00, 0x00);
    del.detach();
    return;
    }
    
void irq(){
    clear();
    welcome();
    return;
    }
    
void Rx_interrupt(){
    pc.attach(&Rx_null, Serial::RxIrq);
    del.detach();
    waiting=false;
    connected();
    return;
    }

    
void itostr(int a){
        for(int i=15; i>=0; i--) {
            if(a==0) str[i]=' ';
            else str[i]=(a%10)+'0', a/=10; 
            }
        return;
        }
        
 void stradd(string s){
     for(int i=0; i<s.size(); i++)str[i]=s[i];
     return;
     }       
void Rx_null (){ return;}
