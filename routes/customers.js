var express = require('express');
var router = express.Router();
var Controllers = require('../controllers/customers')

router.get('/', Controllers.getCustomers);
router.get('/sort/:column', Controllers.getCustomersSorted); 

module.exports = router;