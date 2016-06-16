var Massive = require("massive");
var db = Massive.connectSync({db : "video_store"});

var MovieController = {
  sortTitle: function (req, res, next) {

    db.query("select * from movies order by title", function(err, movieRecords){
      if(err) {
        var err = new Error("It's an error")
        next(err)
      } else {
        res.json(movieRecords)
      }
    });
  },

  sortRelease: function (req, res, next) {
    db.query("select * from movies order by release_date", function(err, movieRecords){
      if(err) {
        var err = new Error("It's an error")
        next(err)
      } else {
        res.json(movieRecords)
      }
    });
  },

  current: function (req, res, next) {
    var movie_id = req.params.id
    console.log(movie_id)
    console.log(req.params)
    db.query("select * from rentals where checked_out = true and movie_id=$1 order by due_date asc", [movie_id], function(err, movieRecords){
      if(err) {
        var err = new Error("It's an error")
        next(err)
      } else {
        res.json(movieRecords)
      }
    });
  },

  history: function (req, res, next) {
    res.send(
      // CODE TO RETRIEVE rentals that were previously checked out by title
    )},

  rentalsTitle: function (req, res, next) {
    res.send(
      // HOW IS THIS DIFFERENT FROM CURRENT/HISTORY BY TITLE?
    )},

  rentalsCustomers: function (req, res, next) {
    res.send(
      //
    )},

  checkout: function (req, res, next) {
    res.send(
      //
    )},

  return: function (req, res, next) {
    res.send(
      //
    )},

  overdue: function (req, res, next) {
    res.send(
      //
    )}
}
module.exports = MovieController
