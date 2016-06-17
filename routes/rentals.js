var express = require('express');
var router = express.Router();
var Controllers = require('../controllers/rentals')

// router.get('/', Controllers.getIndex);
router.get('customer/:customer_id/current', Controllers.getCustomerRentals);

module.exports = router;
