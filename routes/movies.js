var express = require('express');
var router = express.Router();
var Controller = require('../controllers/movies')


router.get('/', Controller.getMovies)
router.get('/sort/:column', Controller.subsetMovies)
router.get('/:title/current', Controller.getMoviesCurrent)
router.get('/:title/history', Controller.getMoviesHistory)


module.exports = router;
