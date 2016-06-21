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

Rentals.checkout = function(title, customer_id, callback) {
  db.videos.findOne({title: title}, function(error, video) {
  if (error || !video) {
    callback(error || new Error("Video not found"), undefined);
  } else {
    if (video.available_inventory < 1) {
      callback(error || new Error("Video not available"), undefined);
    } else {

      var updated_inventory = (video.available_inventory - 1)
      db.videos.update({id: video_id, available_inventory: updated_inventory}, function(error, updated_video){
        if (error || !updated_video) {
          callback(error || new Error("Video not updated"), undefined);
        } else { 
           db.customers.findOne({id: id}, function(error, customer) {
            if (error || !customer) {
              callback(error || new Error("Customer not found"), undefined);
            } else {
              var updated_credit = customer.account_credit - 1
              db.customer.update({id: customer_id, account_credit: updated_credit}, function(error, updated_customer) {
                if (error || !updated_customer) {
                  callback(error || new Error("Customer credit not updated"), undefined);
                } else { 
                //update successful, create rental 
                    db.rentals.insert({
                      customer_id: updated_customer.id,
                      video_id: updated_video.id,
                      checkout_date: Date.now(),
                      due_date: new Date(new Date().getTime()+(1*24*60*60*1000)),
                      checkin_date:null,
                      charge:1.00
                    }, 
                    function(error, new_rental) {
                      callback(null, new_rental)
                    })
                  }
                })
              }
            })
          }
        })
      }
    }
  })

  // go to the video database
    // -1 available inventory 
  // go to the customer record
    // -1 to the credit 
  

  // movie title 
  // customer id
  // use these two to make a create request to Rentals db
    // new database entry with rental
    // checkout date
    // due date (current day +1)
    // checkin date (null)
    // charge 
}



module.exports = Rentals;
