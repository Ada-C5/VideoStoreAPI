var express = require('express');
var router = express.Router();
var IndexController = require('../controllers/index.js');

router.get('/', IndexController.index);

router.get('/api/docs', IndexController.docsHTML);

router.get('/api/docs.json', IndexController.docsJSON);

/**** just a test ****/
router.get('/zomg', function(req, res, next) {
  res.status(200).json({whatevs: 'whatevs!!!'});
});

module.exports = router;
