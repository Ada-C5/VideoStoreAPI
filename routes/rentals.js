var express = require('express');
var router = express.Router();
var Controllers = require('../controllers/rentals')

router.get('/customer/:customer_id/current', Controllers.getCurrentRentals);
router.get('/customer/:customer_id/history', Controllers.getRentalHistory)


module.exports = router;
