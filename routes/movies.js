var express = require('express');
var router = express.Router();
var MoviesController = require('../controllers/movies');

/* GET home page. */
router.get('/', MoviesController.index);

router.get('/sort/release-date', MoviesController.sortMovies);

router.get('/sort/title', MoviesController.sortMovies)

module.exports = router;
