var express = require('express');
var router = express.Router();
var MoviesController = require('../controllers/movies_controller.js');

router.get('/', MoviesController.listMovies)
router.get('/sort/:query', MoviesController.sortBy)
router.get('/:title/current', MoviesController.current)
router.get('/:title/history/sort/:by', MoviesController.sortByHistory)

module.exports = router;
