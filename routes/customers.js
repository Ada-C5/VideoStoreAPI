var express = require('express');
var router = express.Router();
var Controller = require('../controllers/customers')

// select all from db
router.get('/', Controller.getCustomers)
router.get('/sort/:column', Controller.subsetCustomers)
router.get('/:id/current', Controller.getCustomersCurrent)
router.get('/:id/history', Controller.getCustomersHistory)


module.exports = router;
