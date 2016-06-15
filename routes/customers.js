var express = require('express');
var router = express.Router();
var customersController = require('../controllers/customers')

router.get('/', customersController.index) // nothing here, probably omit
router.get('/customers/sort/:query', customersController.sortBy(parmas.req.query))
router.get('/customers/:num/current', customersController.current)
router.get('/customers/:num/history', customersController.history)



module.exports = router;
