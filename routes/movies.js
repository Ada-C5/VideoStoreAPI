var express = require('express');
var router = express.Router();
var Controller = require('../controllers/movies')


router.get('/movies', Controller.getMovies)
router.get('/movies/sort/name?n=10&p=2', Controller.subsetMovies)

module.exports = router;
