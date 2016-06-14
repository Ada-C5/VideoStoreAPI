var express = require('express');
var router = express.Router();
var Controller = require('../controllers/customers')



/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.status(200).json({whatevs: 'whatevs!!!'})
// });


router.get('/customers', Controller.getCustomers)

module.exports = router;
