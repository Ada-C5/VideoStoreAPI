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
    var movie_id = req.params.id
    db.query("select * from rentals where checked_out = false and movie_id=$1 order by due_date asc", [movie_id], function(err, movieRecords){
      if(err) {
        var err = new Error("It's an error")
        next(err)
      } else {
        res.json(movieRecords)
      }
    });
  },

  rentalsTitle: function (req, res, next) {
    var movie_id = req.params.id
    db.query("select * from rentals where movie_id = $1 and checked_out = true"), [movie_id], function(err, rentalRecords) {
      if(err) {
        throw (new Error(err.message))
      } else {
        db.query("select * from movies where movie_id=$1 asc", [movie_id], function(err, movieRecords){
          if(err) {
            var err = new Error("It's an error")
            next(err)
          } else {
            var available = movieRecords.inventory - rentalRecords.length
            res.json({movieRecords: movieRecords, available: available})
          }
        });
      }
      }
},
// NOT YET COMPLETE/FUNCTIONAL

  rentalsCustomers: function (req, res, next) {
    res.send(
      //
    )},

  checkout: function (req, res, next) {
    res.send(
      //
    )},

    return: function (req, res, next) {
      var movie_id = req.params.id
      var customer_id = req.params.customer

      // find rental id# that matches movie_id and customer_id
      // update that instance to checked_out false

        db.rentals.update({id: ID_NUM, checked_out: false}, function(err, rental){
          if(err) {
            var err = new Error("It's an error")
            next(err)
          } else {
            res.json(rental)
          }
        });
      )},

  overdue: function (req, res, next) {
    res.send(
      //
    )}
}
module.exports = MovieController
