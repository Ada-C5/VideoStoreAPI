var app = require("../app");
var db = app.get("db");

// Constructor function
var Rentals = function(customer_id) {
  this.customer_id = customer_id;
};

Rentals.find_current = function(customer_id, callback) {
  db.rentals.where("customer_id=$1 AND checkin_date IS NULL", [customer_id], function(error, rentals) {
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

Rentals.overdue = function(callback) {
  var ultimate_return = []
  db.run("select * from rentals where due_date<now() AND checkin_date IS NULL", function(error, overdue_videos) {
    if(error || !overdue_videos) {
      callback(error || new Error("Overdue videos not found"), undefined);
    } else {
      for (var rental of overdue_videos) {
        db.videos.findOne({id: rental.video_id}, function(rental, error, found_video) {
          if(error || !found_video) {
            callback(error || new Error("Could not find video"), undefined);
          } else {
            db.customers.findOne({id: rental.customer_id}, function(error, found_customer) {
              if(error || !found_customer) {
                callback(error || new Error("Could not find customer"), undefined);
              } else {
                var compiled = {
                  customer: found_customer.name,
                  video: found_video.title,
                  checkout_date: rental.checkout_date,
                  due_date: rental.due_date
                }
                ultimate_return.push(compiled)
                if (overdue_videos.length === ultimate_return.length) {
                  callback(null, ultimate_return);
                }
              }
            })
          }
        }.bind(db.videos, rental)) // Kari is great! Thank you Kari! <3 <3 <3 <3 <3 <3 <3!!!
      }
    }
  })
}

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
                cust.sort(function(a, b) {
                  var nameA = a.name.toUpperCase();
                  var nameB = b.name.toUpperCase();
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
                  return 0;
                });
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
      if (video.available_inventory <= 0) {
        callback(error || new Error("Video not available"), undefined);
      } else {
        var updated_inventory = (video.available_inventory - 1)
        db.videos.update({id: video.id, available_inventory: updated_inventory}, function(error, updated_video){
          if (error || !updated_video) {
            callback(error || new Error("Video not updated"), undefined);
          } else {
            db.customers.findOne({id: customer_id}, function(error, customer) {
              if (error || !customer) {
                callback(error || new Error("Customer not found"), undefined);
              } else {
                var updated_credit = customer.account_credit - 1
                db.customers.update({id: customer_id, account_credit: updated_credit}, function(error, updated_customer) {
                  if (error || !updated_customer) {
                    callback(error || new Error("Customer credit not updated"), undefined);
                  } else {
                    //update successful, create rental
                    db.rentals.insert({
                      customer_id: updated_customer.id,
                      video_id: updated_video.id,
                      checkout_date: new Date(),
                      due_date: new Date(),
                      checkin_date:null,
                      charge:1.00
                    }, function(error, rental_complete) {
                      if (error || !rental_complete) {
                        callback(error || new Error("Rental unable to be added"), undefined)
                      } else {
                        callback(null, rental_complete);
                      }
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
}

  Rentals.checkin = function(title, customer_id, callback) {
    db.videos.findOne({title: title}, function(error, video) {
      if (error || !video) {
        callback(error || new Error("Video not found"), undefined);
      } else {
        if (video.available_inventory >= video.inventory) {
          callback(error || new Error("Video not available"), undefined);
        } else {
          var updated_inventory = (video.available_inventory + 1)
          db.videos.update({id: video.id, available_inventory: updated_inventory}, function(error, updated_video){
            if (error || !updated_video) {
              callback(error || new Error("Video not updated"), undefined);
            } else {
              db.rentals.where("customer_id=$1 AND video_id=$2 AND checkin_date IS NULL", [customer_id, updated_video.id], function(error, found_rental) {
                db.rentals.update({id: found_rental[0].id, checkin_date: new Date()}, function(error, updated_rental) {
                  if (error || !updated_rental) {
                    callback(error || new Error("Rental not updated"), undefined);
                  } else {
                    callback(null, updated_rental)
                  }
                })
              })
              }
            }
          )
        }
      }
    })
  }

module.exports = Rentals;
