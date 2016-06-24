var express = require('express');
var router = express.Router();
var ApiController = require('../controllers/api')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({whatevs: 'whatevs!!!'})
});

router.get('/zomg', function(req, res, next) {
  res.status(200).json({message: 'it works!'})
});

router.get('/api/docs', ApiController.docs);

router.get('/api/docs.json', ApiController.jsonDocs);



module.exports = router;
