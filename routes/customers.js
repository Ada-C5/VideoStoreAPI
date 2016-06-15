var express = require('express')
var router = express.Router()

router.get('/', function(req, res) {
  res.json({customers: 'customers yaaaay'})
})

module.exports = router