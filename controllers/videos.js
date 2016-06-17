var Videos = require("../models/videos");

var VideosController = {

  getVideos: function (request, response, next) {
    Videos.all(function(error, videos) {
      if(error) {
        var err = new Error("Error retrieving videos list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        response.json(videos)
      }
    });
  },

  // video id, sort column, offset (p and n)
  getVideosSorted: function(request, response) {
    Videos.sort(request.params.column, request.query.p, request.query.n, function(error, videos) {
      if(error) {
          var err = new Error("Not Found :(");
          err.status = 404;
      } else {
          response.json(videos)
      }

    })
  },

  getVideo: function (request, response) {
    response.render('video/:id');
  },

  getVideo: function (request, response) {
    response.render('video');
  },

  getRental: function (request, response) {
    response.render('rental');
  }
}

module.exports = VideosController;
