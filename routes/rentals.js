var express = require('express');
var router = express.Router();
var RentalsController = require('../controllers/rentals')

router.get('/overdue', RentalsController.overdue)
router.post('/:movie/check-out', RentalsController.checkOut) // requires json data customer_id and movie title
router.get('/:movie/customers', RentalsController.currentlyCheckedOut) // do we need to pass stuff in?
// router.post('/:movie/return', RentalsController.return) // requires json data customer_id and movie title
router.get('/:movie', RentalsController.lookupMovie)

module.exports = router;
