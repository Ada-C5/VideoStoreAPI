var express = require('express');
var router = express.Router();
var Controller = require('../controllers/rentals')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.status(200).json({whatevs: 'whatevs!!!'})
// });

router.get('/rentals/:title', Controller.getRentals)
router.get('/rentals/:title/customers', Controller.getRentalsCustomers)
router.get('/rentals/:title/check-out', Controller.getRentalsCheckOut)
router.get('/rentals/:title/return', Controller.getRentalsReturn)
router.get('/rentals/overdue', Controller.getRentalsOverdue)




module.exports = router;
