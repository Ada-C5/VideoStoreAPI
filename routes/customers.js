var express = require('express')
var router = express.Router()

var Controller = require('../controllers/customers')

router.get('/', function(req, res) {
  res.json({customers: ''})
})

module.exports = router
