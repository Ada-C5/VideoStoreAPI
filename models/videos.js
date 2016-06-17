var app = require("../app");
var db = app.get("db");

// Constructor function
var Videos = function(id) {
  this.id = id;
};

Videos.all = function(callback) {
  db.videos.find(function(error, videos) {
    if(error || !videos) {
      callback(error || new Error("Could not retrieve videos"), undefined);
    } else {
      callback(null, videos.map(function(video) {
        return new Videos(video);
      }));
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
      callback(error || new Error("Could not retrieve videos"), undefined)
    } else {
      callback(null, videos.map(function(video) {
        return video
      })); 
    }
  });
}


module.exports = Videos;
