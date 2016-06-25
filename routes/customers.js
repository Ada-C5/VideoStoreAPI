var express = require('express');
var router = express.Router();
var CustomerController = require('../controllers/customers');

/* GET home page. */
router.get('/', CustomerController.index);

router.get('/sort/:search?', CustomerController.sort);

router.get('/:customer_id/current', CustomerController.current);

module.exports = router;
