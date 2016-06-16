var app = require("../app");
var db = app.get("db");

var Rental = function(title) {
  this.title = title
};

Rental.getCheckedOut = function(id, callback) {
  db.rentals.findOne(this.title, function(error, rental) {
    if(error) {
      callback(error, undefined);
    } else {
      var checked_out = 0;
      callback(null, checked_out);
    }
  })
}








module.exports = Rental;
