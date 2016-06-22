var express = require('express')
var router = express.Router()
var Controller = require('../controllers/index')

router.get('/', Controller.getIndex)

module.exports = router
