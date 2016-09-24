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
  if(data=='id'){
    db.getPin(1,function(err, id){
      if(err)console.log(err);
      else port.write(data);
    });
  }
});
