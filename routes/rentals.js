var express = require('express');
var router = express.Router();
var Controller = require('../controllers/rentals')

router.get('/:title', Controller.getRentals)
router.get('/:title/customers', Controller.getRentalsCustomers)
// can't post from browser URL
router.get('/:title/check-out/:customerid', Controller.getRentalsCheckOut)
router.get('/:title/return', Controller.getRentalsReturn)
router.get('/overdue', Controller.getRentalsOverdue)




module.exports = router;
