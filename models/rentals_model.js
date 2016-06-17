var app = require("../app");
var db = app.get("db");

var Rental = function(id) {
  this.id = id
};

Rental.getCheckedOut = function(movie_id, callback) {
  // Not sure if this would return in an array or if we'd have to convert it to an array
  var array = db.rentals.where("movie_id=$1 AND returned=$2", [movie_id, false], function(error, rental) {
    if(error) {
      callback(error, undefined);
    } else {
      var checked_out = array.length;
      callback(null, checked_out);
    }
  })
}

Rental.getCurrentRentals = function(customer_id, callback) {
  db.rentals.where("customer_id=$1 AND returned=$2", [customer_id, false], function(error, checked_out) {
    if(error) {
      callback(error, undefined);
    } else {
      callback(null, checked_out);
    }
  })
}




module.exports = Rental;
