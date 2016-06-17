var express = require('express')
var router = express.Router()
var Controller = require('../controllers/rentals')

// router.get('/', function (req, res) {
//   res.json({rentals: "home for rentals!"})
// })

router.get('/', Controller.getRentals)
router.get('/:title', Controller.getRentalsShow)
// router.get('/:title/customers', Controller.getRentalStatus)

module.exports = router