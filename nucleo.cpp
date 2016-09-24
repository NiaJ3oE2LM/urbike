#include "mbed.h"
#include "Grove_LCD_RGB_Backlight.h"
#include "string" //ok

#define ID 01

using namespace std;

Timeout del;

int t=15;
char c;


Grove_LCD_RGB_Backlight lcd(PB_9, PB_8);
InterruptIn button(PC_13); //user button

RawSerial pc(SERIAL_TX, SERIAL_RX);
//Serial gps(PA_9, PA_10);
void code();
void welcome();
void connected();
void id();
void timeout();
void clear();
void irq();


int main(){ 
pc.baud(115200);
button.fall(&irq);

while(1){
    }   
}

void code(){  
    lcd.locate(0,1), lcd.print("wait for code...");
    del.detach();
    del.attach(&id, 2);
    return;
    }
void id(){
    int pin= rand()*10; // non funziona
    lcd.clear(), lcd.locate(0,0), lcd.print("rand");
    printf("{\"mode\":\"id\", \"value\":%d}\n", pin);
    del.detach();
    del.attach(&timeout, 2);
    return;
    }
    
void timeout(){
    if (t==0){
        t=30;
        del.detach();
        del.attach(&clear, 2);
        return;
        }
    else {
        lcd.locate(0,1), lcd.print("tempo");
        printf("{\"mode\":\"wait\"}\n");
        if(pc.readable()&& (c=pc.getc())==('1'+'0')){
            c='0';
            del.detach();
            del.attach(&connected, .1);
            }
        t--;
        del.detach();
        del.attach(&timeout, 2);
        }
    }

void welcome(){
    lcd.setRGB(0x00, 0x00, 0xff);                 //set the color 
    lcd.print("Urbike");
    del.attach(&code, 2);
    return;
    }
    
void connected(){
    lcd.setRGB(0x00, 0xff, 0x00);                
    lcd.print("connected");
    del.attach(&clear, 2);
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
