var app = require("../app");
var db = app.get("db");

var Rental = function(id) {
  this.id = id
};

Rental.getCheckedOut = function(title, callback) {
  // Not sure if this would return in an array or if we'd have to convert it to an array
  db.rentals.where("title=$1 AND returned=$2", [title, false], function(error, checked_out) {
    if(error) {
      callback(error, undefined);
    } else {
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

Rental.getPastRentals = function(customer_id, callback) {
  db.rentals.where("customer_id=$1 AND returned=$2", [customer_id, true], function(error, checked_out) {
    if(error) {
      callback(error, undefined);
    } else {
      callback(null, checked_out);
    }
  })
}

Rental.getOverdue = function(callback) {
  var now = new Date().toISOString().split('T')[0];
  db.rentals.where("returned=$1 AND due_date<$2", [false, now], function(error, overdue) {
    if(error) {
      callback(error, undefined);
    } else {
      callback(null, overdue);
    }
  })
}



module.exports = Rental;
