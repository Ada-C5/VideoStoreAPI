var express = require('express')
var router = express.Router()

var Controller = require('../controllers/customers')

router.get('/', Controller.getCustomers)
router.get('/:id', function(request, response) {
  var id = request.params.id
  Controller.getCustomersShow(request, response, id)
})

module.exports = router
