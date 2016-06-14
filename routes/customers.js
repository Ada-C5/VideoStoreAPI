var express = require('express');
var router = express.Router();
var CustomerController = require('../controllers/customers');

/* GET home page. */
router.get('/', CustomerController.index);

module.exports = router;
