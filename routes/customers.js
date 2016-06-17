var express = require('express');
var router = express.Router();
var Controllers = require('../controllers/customers')

router.get('/', Controllers.getIndex);
router.get('/customers', Controllers.getCustomers);
router.get('/customers/sort/:column', Controllers.getCustomersSorted); 

module.exports = router;