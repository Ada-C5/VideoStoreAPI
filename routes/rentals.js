var express = require('express')
var router = express.Router()
var Controller = require('../controllers/rentals')

router.get('/', Controller.getRentals)
router.get('/:title', Controller.getRentalsShow)
router.get('/customers/:id/current', Controller.getRentalsCurrent)

module.exports = router
