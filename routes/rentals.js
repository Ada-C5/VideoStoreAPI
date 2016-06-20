var express = require('express');
var router = express.Router();
var RentalsController = require('../controllers/rentals')

router.get('/overdue', RentalsController.overdue)
router.get('/:movie/customers', RentalsController.currentlyCheckedOut) // do we need to pass stuff in?
router.get('/:movie', RentalsController.lookupMovie)
// router.post('/:movie/check-out', RentalsController.checkOut) // requires json data customer_id and movie title
// router.post('/:movie/return', RentalsController.return) // requires json data customer_id and movie title

module.exports = router;
