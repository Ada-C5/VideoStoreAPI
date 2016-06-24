var app = require("../app");
var db = app.get("db");

// Constructor function
var Videos = function(id) {
  this.id = id;
};

Videos.all = function(callback) {
  db.videos.find(function(error, videos) {
    if(error || !videos) {
      callback(new Error("Could not retrieve videos"), undefined);
    } else {
      callback(null, videos.map(function(video) {
        return new Videos(video);
      }));
    }
  });
};

Videos.find = function(title, callback) {
  db.videos.find({title: title}, function(error, video) {
    if (error || !video) {
      callback(new Error("Could not retrieve video"), undefined)
    } else {
      callback(null, video)
    }
  });
};

Videos.sort = function(column, p, n, callback) {
 db.videos.find({}, {
    order: column,
    limit: n,
    offset: p
  }, function(error, videos) {
    if (error || !videos) {
      callback(new Error("Could not retrieve videos"), undefined)
    } else {
      callback(null, videos.map(function(video) {
        return video
      }));
    }
  });
}

Videos.customer_current = function(title, callback) {
  db.videos.findOne({title: title}, function(error, videos) {

    if (error || !videos) {
      callback(new Error("Rentals not found"), undefined);
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

module.exports = Videos;
