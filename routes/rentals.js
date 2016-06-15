var express = require('express')
var router = express.Router()

router.get('/', function(req, res) {
  res.json({rentals: 'home for rentals!!'})
})

router.get('/:title', function(req, res) {
  res.json({rentals: 'rentals!!'})
})

module.exports = router