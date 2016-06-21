var express = require('express')
var router = express.Router()
var Controller = require('../controllers/movies')

router.get('/', Controller.getMovies)
router.get('/:title', Controller.getMoviesShow)
router.get('/sort/:field', Controller.getMoviesSort)
router.get('/:title/current', Controller.getMoviesCurrent)
router.get('/:title/history/sort/name', Controller.getMoviesHistory)

module.exports = router
