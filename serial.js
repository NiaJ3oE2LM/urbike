 //TODO bypass ttn connection while developing --> restore lorawan asap

var SerialPort = require('serialport');
var db = require('./mysql');


var port = new SerialPort('/dev/ttyACM0', {
  parser: SerialPort.parsers.readline('\n'),
  baudRate: 115200
},function (err) {
  if (err) {
    return console.log('Error: ', err.message);
  }
});

port.on('data', function (data) {
  //create new line on register table with bikeId as parameter
  if(data=='bikeId'){
    port.on('data', function(data){
      db.setPin(1, data, function(err, data){ //bikeId 1
        if(err)console.log(err);
        else console.log("db updated");
      });
    });
  }
  //check for the user to upload the correct id -- polling with timeout
  else if(data=="reg"){
    port.on('data', function(id){//id line register
      db.getPin(id, function(err, data){
        if(err)console.log(err);
        else console.log("data"); //TODO check if result is null of number
      });
    });
  }
});
