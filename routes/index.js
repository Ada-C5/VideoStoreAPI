var express = require('express');
var router = express.Router();
var Controllers = require('../controllers/index')

/* GET home page. */

// router.get('/', Controllers.getIndex);
router.get('/api/docs.json', Controllers.getApiDocs);

// router.get('/', function(req, res, next) {
//   res.status(200).json({index: 'index'})
// });

// part of baseline project
// router.get('/zomg', function(req, res, next) {
//   res.status(200).json({whatevs: 'it works!!!!'})
// });

module.exports = router;
