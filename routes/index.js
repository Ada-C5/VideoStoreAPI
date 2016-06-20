var express = require('express');
var router = express.Router();
var documentation = require('../lib/documentation')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({whatevs: 'whatevs!!!'})
});

router.get('/zomg', function(req, res, next) {
  res.status(200).json({whatevs: 'it works!!!'})
});

router.get('/api/docs', function(req, res, next) {
  res.status(200).json({whatevs: 'whatevs!!!'})
});

module.exports = router;
