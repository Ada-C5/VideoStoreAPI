var app = require("../app");
var db = app.get("db");

// Constructor function
var Rentals = function(customer_id) {
  this.customer_id = customer_id;
};

Rentals.find_current = function(customer_id, callback) {
  db.rentals.where("customer_id=$1 AND checkin_date is null", [customer_id], function(error, rentals) {
    if(error || !rentals) {
      callback(error || new Error("Rentals not found"), undefined);
    } else {
      callback(null, rentals);
    }
  }
)}

Rentals.find_history = function(customer_id, callback) {
  db.rentals.where("customer_id=$1 AND checkin_date IS NOT NULL ORDER BY checkout_date", [customer_id], function(error, rentals) {
    if(error || !rentals) {
      callback(error || new Error("Rentals not found"), undefined);
    } else {
      callback(null, rentals);
    }
  }
)}

Rentals.video_current = function(title, callback) {
  var video = db.videos.findOne(title)
  console.log(video)
  db.rentals.where(video.id, function(error, rentals) {
    if(error || !rentals) {
      callback(error || new Error("Rentals not found"), undefined);
    } else {
      callback(null, rentals);
    }
  }
)}

module.exports = Rentals;
