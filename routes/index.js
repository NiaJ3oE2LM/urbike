var  express=require('express'),
  assets = require('./public'),
  db = require('../mysql'),
  bodyParser=require('body-parser');

var router= express.Router();
router.use(bodyParser.json());
router.use('/public', assets);


router.route('/').get(function(req, res){
  res.render('./app');
});
router.route('/map').get(function(req, res){
  res.render('./map');
})
.post(function(req, res){
  console.log(req.body);
  db.setUser(req.body.userId, req.body.bikeId, req.body.pin, function(err, res){
    if(err)console.log(err);
    else console.log(res);
  });
  res.end();
});
router.route('/about').get(function(req, res){
  res.render('./about');
});
router.route('/user').get(function(req, res){
  res.render('./user');
});
router.route('/contact').get(function(req, res){
  res.render('./contact');
});

module.exports = router;
