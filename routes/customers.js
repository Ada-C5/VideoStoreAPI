var express = require('express')
var router = express.Router()
var Controller = require('../controllers/customers')

/* GET home page. */
router.get('/', Controller.allCustomers)
router.get('/sort/name', Controller.sortName)
router.get('/sort/registered-at', Controller.sortDate)
router.get('/sort/postal-code', Controller.sortPostalCode)

router.get('/:id/current', Controller.current)
router.get('/:id/history', Controller.history)

module.exports = router
