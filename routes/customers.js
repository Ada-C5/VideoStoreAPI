var express = require('express')
var router = express.Router()

var Controller = require('../controllers/customers')

router.get('/', Controller.getCustomers)
router.get('/:id', Controller.getCustomersShow)
router.get('/sort/:field', Controller.getCustomersSort)


module.exports = router
