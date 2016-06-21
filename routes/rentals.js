var express = require('express');
var router = express.Router();
var Controller = require('../controllers/rentals')

router.get('/overdue', Controller.getRentalsOverdue)
router.get('/:title', Controller.getRentals)
router.get('/:title/customers', Controller.getRentalsCustomers)
// can't post from browser URL
router.get('/:title/check-out/:customerid', Controller.getRentalsCheckOut)
// must pass rental id, sorry....
// passing movie titles is UNRELIABLE!
router.get('/return/:id', Controller.getRentalsReturn)




module.exports = router;
