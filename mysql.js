var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '64.137.209.170', //127.0.0.1  nel server
  user     : 'intelsmartpark',
  password : 'vrfablabintel',
  database : 'intelmaker'
});
/* exports.insertOccupato = function (parkID, beaconID, plate, occupato, callback){

    var sql="INSERT INTO ISP_register (parkID, beaconID, timeStart, plate, state) VALUES ("+parkID+",'"+beaconID+"',SYSDATE(),'"+plate+"',"+occupato+")";
    connection.query(sql, function(err, result){

      if(err) callback(err, null);
      else callback(null, result);

    });

}*/
