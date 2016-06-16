var express = require('express');
var router = express.Router();
var Controller = require('../controllers/rentals')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.status(200).json({whatevs: 'whatevs!!!'})
// });

router.get('/:title', Controller.getRentals)
router.get('/:title/customers', Controller.getRentalsCustomers)
router.get('/:title/check-out', Controller.getRentalsCheckOut)
router.get('/:title/return', Controller.getRentalsReturn)
router.get('/overdue', Controller.getRentalsOverdue)




module.exports = router;
