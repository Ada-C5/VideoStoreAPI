var express = require('express');
var router = express.Router();
var IndexController = require('../controllers/index.js');

/* GET home page. */
router.get('/zomg', function(req, res, next) {
  res.status(200).json({whatevs: 'whatevs!!!'});
});

router.get('/stuff', IndexController.index);

module.exports = router;
