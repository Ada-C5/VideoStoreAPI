var express = require('express')
var router = express.Router()
var Controller = require('../controllers/index')

router.get('/', Controller.getIndex)
router.get('/zomg', Controller.getZomg)

module.exports = router
