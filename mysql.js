var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '64.137.209.170', //127.0.0.1  nel server
  user     : 'urbike',
  password : 'vrfablabintel',
  database : 'urbike'
});

exports.setUser = function (userId,bikeId,pin,callback){//return userPin
  var sql="update register set userId = (select id from users where id= "+userId+") where bikeId = (select id from bikes where id= "+bikeId+") and userId is null and pin = "+pin+";";
  connection.query(sql, function(err, result){

    if(err) callback(err, null);
    else callback(null, result);

  });
}

exports.getUser = function (bikeId, callback){//bike sets his pin
  //TODO il database gestisce la logica dell'insert in register controllando che non si possano inserire duplicati.NON SE PO!
  var sql="#select userId from register where bikeId = (select id from bikes where id= "+bikeId+");";
  connection.query(sql, function(err, result){

    if(err) callback(err, null);
    else callback(null, result);

  });
}

exports.setPin = function (bikeId, pin, callback){//bike sets his pin
  //TODO il database gestisce la logica dell'insert in register controllando che non si possano inserire duplicati.NON SE PO!
  var sql="update register set userId=null,pin="+pin+",timeStart=null,timeFinish=null where bikeId=(select id from bikes where id= "+bikeId+" and timeFinish is not null;";
  connection.query(sql, function(err, result){

    if(err) callback(err, null);
    else callback(null, result);

  });
}

exports.unlock = function (bikeId, callback){//timestart
    var sql="update register set timeStart = sysdate() where bikeId= (select id from bikes where id= "+bikeId+" and userId is not null;";
  connection.query(sql, function(err, result){

    if(err) callback(err, null);
    else callback(null, result);

  });
}

exports.updatePos = function (bikeId, lat, lon, callback){
  var sql="UPDATE bikes SET lat="+lat+", lon="+lon+" WHERE id=(select id from bikes where id= "+bikeId+");";
  connection.query(sql, function(err, result){

    if(err) callback(err, null);
    else callback(null, result);

  });
}

exports.lock = function (bikeId, callback){
  var sql="update register set timeFinish=sysdate() where bikeId=(select id from bikes where id= "+bikeId+") and timeStart is not null; update bikes set lat=50, lon=12 where id=(select id from bikes where id= "+bikeId+");";
  connection.query(sql, function(err, result){

    if(err) callback(err, null);
    else callback(null, result);

  });
}
