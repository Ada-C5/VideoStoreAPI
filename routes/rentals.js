var express = require('express')
var router = express.Router()
var Controller = require('../controllers/rentals')

router.get('/', Controller.getRentals)
router.get('/:title', Controller.getRentalsShow)
// router.get('/:title/customers', Controller.getRentalsCustomers)

module.exports = router
