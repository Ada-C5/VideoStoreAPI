var express = require('express')
var router = express.Router()
var Controller = require('../controllers/movies')

router.get('/', Controller.getMovies)
router.get('/:title', Controller.getMoviesShow)
router.get('/sort/:field', Controller.getMoviesSort)

module.exports = router
