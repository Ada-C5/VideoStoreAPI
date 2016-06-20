var express = require('express');
var router = express.Router();
var RentalsController = require('../controllers/rentals');

/* GET home page. */
router.get('/:title', RentalsController.show);

module.exports = router;
