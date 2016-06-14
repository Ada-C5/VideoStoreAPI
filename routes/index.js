var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({whatevs: 'whatevs!!!'})
});

// GET 

// list of all of the customers
// sort by  
  //name
  //registered at (date)
  // postal code 
//customer/id
  // /current (ordered by checkout date, includes return date)
  // /history (ordered by checkout date, includes return date)

// GET 
//movies
  //sort by same trash as before
  // title / release date 
  // given a movie title, shows a list of customers who have CURRENTLY checked it out
    // list of name, phone number and account credit
    // postal code 
//movies/name
  // /current (ordered by checkout date, includes return date)
  // /history (ordered by checkout date, includes return date)
  // sort by name OR checkout date 


// rental routes ~ rental/name (ie rental/Jaws)

//GET 
  // synopsis
  // release date 
  // available inventory (not checked out currently)
  // total inventory 

//GET
  //rental/jaws/customers
    // given a movie title, shows a list of customers who have CURRENTLY checked it out

// POST and PUT 
  // checkout and return functionality
    // title of movie + customer ID to check out and check in a film 
    // need to makeup return date and cost 
//PUT
    // update the inventory for that movie (checkout / checkin)
// GET 
    // overdue functionality rentals/overdue 
        // shows name, movie title, check out date and return date 


module.exports = router;
