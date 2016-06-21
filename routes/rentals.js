var express = require('express');
var router = express.Router();
var Controllers = require('../controllers/rentals')

router.get('/customer/:customer_id/current', Controllers.getCurrentRentals);
router.get('/customer/:customer_id/history', Controllers.getRentalHistory)

router.get('/:title/current', Controllers.getVideoCurrent)
router.get('/:title/history/sort/:ordered_by', Controllers.getVideoHistory)

router.get('/video/:title/checkout/:customer_id', Controllers.postCheckout)
router.post('/video/:title/checkout/:customer_id', Controllers.postCheckout)

router.get('/video/:title/checkin/:customer_id', Controllers.postCheckin)
router.post('/video/:title/checkin/:customer_id', Controllers.postCheckin)

module.exports = router;
