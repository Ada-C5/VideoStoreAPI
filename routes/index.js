var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({whatevs: 'whatevs!!!'})
});

router.get('/zomg', function(req, res, next) {
  res.status(200).json({message: 'it works!'})
});

router.get('/api/docs', function(req, res, next) {
  res.render('docs')
});

router.get('/api/docs.json', function(req, res, next) {
  res.status(200).json({message: 'docs, yo!'})
});



module.exports = router;
