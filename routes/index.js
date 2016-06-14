var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({whatevs: 'whatevs!!!'})
});

/*
customers
GET customers
GET customers/sort/name?n=10&p=2
GET customers/sort/registered_at
GET customers/sort/postal_code

GET customers/:id/current
GET customers/:id/history

movies
GET movies
GET movies/sort/release-date?n=5&p=1
GET movies/sort/title
GET movies/sort/release-date

GET movies/:title/current
GET movies/:title/history/sort/name
GET movies/:title/history/sort/checkout-date

rentals
GET rentals/:title
GET rentals/:title/customers
POST rentals/:title/checkout
POST rentals/:title/return
GET rentals/overdue

*/


module.exports = router;
