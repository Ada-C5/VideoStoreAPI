var express = require('express');
var router = express.Router();
var IndexController = require('../controllers/index.js');

router.get('/', IndexController.index);

/* test GET page. */
router.get('/zomg', function(req, res, next) {
  res.status(200).json({whatevs: 'whatevs!!!'});
});

router.get('/api/docs.json', IndexController.docsJSON)

module.exports = router;
