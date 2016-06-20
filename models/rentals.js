var app = require("../app");
var db = app.get("db");

// Constructor function
var Rentals = function(customer_id) {
  this.customer_id = customer_id;
};

Rentals.find_current = function(customer_id, callback) {
  db.rentals.where("customer_id=$1 AND checkin_date=null", [customer_id], function(error, rentals) {
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
  db.videos.findOne({title: title}, function(error, videos) {

    if (error || !videos) {
      callback(error || new Error("Rentals not found"), undefined);
    } else {
      var video_id = videos.id
      var cust = []
      db.rentals.find({video_id: video_id, checkin_date: null}, function(error, rentals) {
        if(error || !rentals) {
          callback(error || new Error("Rentals not found"), undefined);
        } else {

          for (var rental of rentals) {
            db.customers.findOne({id: rental.customer_id}, function(error, customer) {
              cust.push(customer)
              if (cust.length === rentals.length) {
                callback(null, cust);
              }
            })
          }
        }
      })
    }
  })
}

Rentals.find_video_history = function(title, ordered_by, callback) {
  db.videos.findOne({title: title}, function(error, videos) {

    if (error || !videos) {
      callback(error || new Error("Rentals not found"), undefined);
    } else {
      var video_id = videos.id
      var cust = []
      db.rentals.where("video_id=$1 AND checkin_date IS NOT NULL ORDER BY $2", [video_id, ordered_by], function(error, rentals) {
        if(error || !rentals) {
        callback(error || new Error("Rentals not found"), undefined);
        } else {

          for (var rental of rentals) {
            db.customers.findOne({id: rental.customer_id}, function(error, customer) {
              cust.push(customer)
              if (cust.length === rentals.length) {
                callback(null, cust);
              }
            })
          }
        }
      })
    }
  })
}

module.exports = Rentals;
