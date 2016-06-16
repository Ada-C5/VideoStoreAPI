var express = require('express');
var router = express.Router();
var MoviesController = require('../controllers/movies_controller')

router.get('/', MoviesController.listMovies)
router.get('/sort/:query', MoviesController.sortBy)
router.get('/:movie/current', MoviesController.current)
router.get('/:movie/history/sort/:by', MoviesController.sortByHistory)

module.exports = router;
