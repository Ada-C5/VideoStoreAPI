var express = require('express');
var router = express.Router();
var Controllers = require('../controllers/customers')

/* GET home page. */
// router.get('/zomg', function(req, res, next) {
//   res.status(200).json({zomg: 'it works!!!!'})
// });


/* GET home page. */
// a callback
router.get('/', Controllers.getIndex);

// GET the zomg page 
// router.get('/zomg', Controllers.getZomg); 

// GET 

// GET the customer page 
router.get('/customers', Controllers.getCustomers);
router.get('/customers/sort/:column', Controllers.getCustomersSorted); 
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
router.get('/video', Controllers.getVideo);
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
router.get('/rental', Controllers.getRental);
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
