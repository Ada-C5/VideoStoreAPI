var express = require('express');
var router = express.Router();
var Controllers = require('../controllers/rentals')

router.get('/customer/:customer_id/current', Controllers.getCurrentRentals);
router.get('/customer/:customer_id/history', Controllers.getRentalHistory)

router.get('/video/:title/current', Controllers.getVideoCurrent)
router.get('/video/:title/history/sort/:ordered_by', Controllers.getVideoHistory)

module.exports = router;
