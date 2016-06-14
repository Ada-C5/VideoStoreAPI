var express = require('express')
var router = express.Router()
var Controller = require('../controllers/customers')

/* GET home page. */
router.get('/sort/', function (req, res, next) {
  res.status(200).json({whatevs: 'whatevs!!!'})
})

module.exports = router
