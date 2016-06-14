var express = require('express');
var router = express.Router();
var Controller = require('../controllers/movies')


router.get('/movies', Controller.getMovies)
router.get('/movies/sort/release-date?n=10&p=2', Controller.subsetMovies)
router.get('/movies/:title/current', Controller.getMoviesCurrent)
router.get('/movies/:title/history', Controller.getMoviesHistory)


module.exports = router;
