var express = require('express')
var router = express.Router()

var Controller = require('../controllers/customers')

router.get('/', Controller.getCustomers)
router.get('/:name', Controller.getCustomersShow)
router.get('/sort/:field', Controller.getCustomersSort)
router.get('/:id/current', Controller.getRentalsCurrent)
router.get('/:id/history', Controller.getRentalsHistory)



module.exports = router
