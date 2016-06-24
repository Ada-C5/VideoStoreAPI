var express = require('express');
var router = express.Router();
var himalaya = require('himalaya');
var html = require('fs').readFileSync('README.md');
var json = himalaya.parse(html); //actually md. close enough.

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({whatevs: 'whatevs!!!'})
});

router.get('/zomg', function(req, res, next) {
  res.status(200).json({whatevs: 'it works!!!'})
});

router.get('/api/docs', function(req, res, next) {
  res.render('../views/index')
});

router.get('/api/docs.json', function(req, res, next) {
  res.json(json)
});

module.exports = router;
