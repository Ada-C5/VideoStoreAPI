var express = require('express');
var router = express.Router();
var Controller = require('../controllers/customers')



/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.status(200).json({whatevs: 'whatevs!!!'})
// });


router.get('/customers', Controller.getCustomers)
// wtf - see instructions?????
router.get('/customers/sort/name?n=10&p=2', Controller.subsetCustomers)
router.get('/customers/:id/current', Controller.getCustomersCurrent)
router.get('/customers/:id/history', Controller.getCustomersHistory)


module.exports = router;
