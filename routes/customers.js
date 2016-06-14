var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/sort/', function (req, res, next) {
  res.status(200).json({whatevs: 'whatevs!!!'})
})

module.exports = router
