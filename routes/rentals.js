var express = require('express')
var router = express.Router()
var Controller = require('../controllers/rentals')

router.get('/', Controller.getRentals)
router.get('/:title', Controller.getRentalsShow)

module.exports = router
