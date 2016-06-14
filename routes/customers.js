var express = require('express');
var router = express.Router();
var Controller = require('../controllers/customers')

// select all from db
router.get('/customers', Controller.getCustomers)
// customer id, sort column, offest ?????
router.get('/customers/sort/name?n=10&p=2', Controller.subsetCustomers)
router.get('/customers/:id/current', Controller.getCustomersCurrent)
router.get('/customers/:id/history', Controller.getCustomersHistory)


module.exports = router;
