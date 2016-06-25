var express = require('express')
var router = express.Router()
var customersController = require('../controllers/customers_controller')

// customers index
router.get('/', customersController.customerList)

// customers sort
router.get('/sort/name', customersController.customersNameSort)
router.get('/sort/registered_at', customersController.customersRegisteredSort)
router.get('/sort/postal_code', customersController.customersPostalSort)

// customers by id
router.get('/:id/current', customersController.currentCheckOuts)
router.get('/:id/history', customersController.historicalCheckOuts)

module.exports = router
