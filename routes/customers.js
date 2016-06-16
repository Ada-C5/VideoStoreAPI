var express = require('express');
var router = express.Router();
var CustomersController = require('../controllers/customers')

router.get('/', CustomersController.index) // nothing here, probably omit
router.get('/customers/sort/:query', CustomersController.sortBy(parmas.req.query))
router.get('/customers/:num/current', CustomersController.current)
router.get('/customers/:num/history', CustomersController.history)

module.exports = router;
