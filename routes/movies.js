var express = require('express');
var router = express.Router();
var Controller = require('../controllers/movies')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({whatevs: 'whatevs!!!'})
});

module.exports = router;
