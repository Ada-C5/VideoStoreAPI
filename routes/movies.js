var express = require('express');
var router = express.Router();
var MoviesController = require('../controllers/movies');

/* GET home page. */
router.get('/', MoviesController.index);

module.exports = router;
