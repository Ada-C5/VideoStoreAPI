var express = require('express');
var router = express.Router();
var MoviesController = require('../controllers/movies');

/* GET home page. */
router.get('/', MoviesController.index);

router.get('/sort/:sort_param', MoviesController.sort);

router.get('/:title/current', MoviesController.current);

module.exports = router;
