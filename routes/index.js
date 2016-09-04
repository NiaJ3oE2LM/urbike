var  express=require('express'),
  assets = require('./public'),
  bodyParser=require('body-parser');

var router= express.Router();
router.use(bodyParser.json());
router.use('/public', assets);


router.route('/').get(function(req, res){
  res.render('./app');
});
router.route('/map').get(function(req, res){
  res.render('./map');
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
