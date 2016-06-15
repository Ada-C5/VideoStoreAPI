var express = require('express');
var router = express.Router();

// GET customers
router.get('/', function(req, res, next) {
  res.status(200).json({title: 'List of Customers:'})
});

// GET customers/sort/name?n=10&p=2
router.get('/sort/', function(req, res, next) {
  res.status(200).json({title: 'Sorted List of Customers:'})
});

// GET customers/sort/registered_at
router.get('/sort/registered-at', function(req, res, next) {
  res.status(200).json({title: 'List of Customers Sorted by Register Date:'})
});

// GET customers/sort/postal_code
router.get('/sort/postal-code', function(req, res, next) {
  res.status(200).json({title: 'List of Customers Sorted by Postal Code:'})
});

// GET customers/:id/current
router.get('/:id/current', function(req, res, next) {
  res.status(200).json({title: 'List of Movies the Customer Currently Has Checked-Out:'})
});

// GET customers/:id/history
router.get('/:id/current', function(req, res, next) {
  res.status(200).json({title: 'List of Movies the Customer Has Checked-Out in the Past:'})
});



module.exports = router
