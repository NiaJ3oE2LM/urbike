var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '64.137.209.170', //127.0.0.1  nel server
  user     : 'urbike',
  password : 'vrfablabintel',
  database : 'urbike'
});

exports.getPin = function (bikeId,callback){
  var sql="SELECT pin FROM bikes WHERE id="+bikeId+";";
  connection.query(sql, function(err, result){

    if(err) callback(err, null);
    else callback(null, result);

  });
}

exports.updatePos = function (bikeId, lat, lon, callback){
  var sql="UPDATE bikes SET lat="+lat+", lon="+lon+" WHERE id="+bikeId+";";
  connection.query(sql, function(err, result){

    if(err) callback(err, null);
    else callback(null, result);

  });
}

exports.unlock = function (json, callback){

    var sql="";
  connection.query(sql, function(err, result){

    if(err) callback(err, null);
    else callback(null, result);

  });
}

exports.lock = function (callback){
  var sql="";//timestamp dal db
  connection.query(sql, function(err, result){

    if(err) callback(err, null);
    else callback(null, result);

  });
}
