var express = require('express');
var router = express.Router();

var Controller = require('../controllers/customers_controller')

// GET customers //
router.get('/', Controller.getCustomers)

// GET customers/sort/name?n=10&p=2
router.get('/sort/name*', Controller.sortName)

// GET customers/sort/registered_at
router.get('/sort/registered-at', Controller.sortRegistered)

// GET customers/sort/postal_code
router.get('/sort/postal-code', Controller.sortPostal)

// GET customers/:id/current
router.get('/:id/current', Controller.customerCurrent)

// GET customers/:id/history
router.get('/:id/history', Controller.customerHistory)


module.exports = router
