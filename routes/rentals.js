var express = require('express');
var router = express.Router();
var rentalsController = require('../controllers/rentals')

router.get('/:movie', rentalsController.lookupMovie)
router.get('/:movie/customers', rentalsController.sortBy) // do we need to pass stuff in?
router.post('/:movie/check-out', rentalsController.checkOut) // requires json data customer_id and movie title
router.post('/:movie/return', rentalsController.return) // requires json data customer_id and movie title
router.get('/overdue', rentalsController.overdue)


module.exports = router;
