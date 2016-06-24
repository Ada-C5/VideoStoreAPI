var express = require('express')
var router = express.Router()
var Controller = require('../controllers/rentals')

router.get('/', Controller.getRentals)
router.get('/:title', Controller.getRentalsShow)
router.get('/:title/customers', Controller.getRentalsCustomers)
router.get('/overdue', Controller.overdue)

router.post('/:title/checkout', Controller.postCheckout)
router.put('/:title/checkin', Controller.putCheckin)

module.exports = router
