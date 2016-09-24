var  express=require('express'),
  bodyParser=require('body-parser'),
  db=require('../mysql');

var router= express.Router();
router.use(bodyParser.json());

var resNeg ={ // state true -> ok state false -> ko
  state:false,
  mes:'errore'
};

var resPos ={ // state true -> ok state false -> ko
  state:true,
  mes:'tutto ok'
};

var resAbu ={ // state true -> ok state false -> ko
  state:false,
  mes:'no permesso'
};

router.route('/')
.put(function (req, res) {})
.post(function(req, res){});

router.route('/:bikeID')
.get(function(req, res){});

module.exports = router;
