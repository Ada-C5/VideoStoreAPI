var express = require('express')
var router = express.Router()

router.get('/', function(req, res) {
  res.json({customers: 'customers yaaaay'})
})

// router.get('/customers', function(req, res, next) {
//   res.status(200).json({customers: 'customers yaaaay!'})
// })

// router.get('/zomg', function(req, res) {
//   res.status(200).json({working: 'hell yeah it works!'})
// })

module.exports = router