var express = require('express');
var router = express.Router();
var moviesController = require('../controllers/movies')

router.get('/', moviesController.listMovies)
router.get('/sort/:query', moviesController.sortBy)
router.get('/:movie/current', moviesController.current)
router.get('/:movie/history/sort/:by', moviesController.sortedHistory)


module.exports = router;
