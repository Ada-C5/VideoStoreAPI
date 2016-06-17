var app = require("../app");
var db = app.get("db");

// Constructor function
var Rentals = function(id) {
  this.id = id;
};

Rentals.find = function(customer_id, callback) {
  db.rentals.find({customer_id: customer_id}, function(error, rental) {
    if(error || !rental) {
      callback(error || new Error("Rentals not found"), undefined);
    } else {
      callback(null, new Rental(rental.customer_id));
    }
  });
};

// Rentals.all = function(callback) {
//   db.rentals.find(function(error, rentals) {
//     if(error || !rentals) {
//       callback(error || new Error("Could not retrieve rentals"), undefined);
//     } else {
//       callback(null, Rentals.map(function(rental) {
//         return new Rentals(rental);
//       }));
//     }
//   });
// };
//
//
// Rentals.sort = function(column, p, n, callback) {
//  db.rentals.find({}, {
//     order: column,
//     limit: n,
//     offset: p
//   }, function(error, rentals) {
//     if (error || !rentals) {
//       callback(error || new Error("Could not retrieve rentals"), undefined)
//     } else {
//       callback(null, Rentals.map(function(rental) {
//         return rental
//       }));
//     }
//   });
// }


module.exports = Rentals;
