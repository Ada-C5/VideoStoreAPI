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
        var customers = []
        for (var movie of movieRecords) {
        db.query("select * from customers where id=$1", [movie.customer_id], function(err, customerRecords){
          if(err) {
            var err = new Error("It's an error")
            next(err)
          } else {
            customers.push(customerRecords)
            // console.log(customers)
          }
          res.json(customers)

        }
      )}
    }
      }
    )},

  historyName: function (req, res, next) {
    var movie_id = req.params.id
    db.query("select * from rentals where checked_out = false and movie_id=$1 order by due_date asc", [movie_id], function(err, movieRecords){
      if(err) {
        var err = new Error("It's an error")
        next(err)
      } else {
        var customers = []
        for (var movie of movieRecords) {
        db.query("select * from customers where id=$1", [movie.customer_id], function(err, customerRecords){
          if(err) {
            var err = new Error("It's an error")
            next(err)
          } else {
            customers.push(customerRecords)
            // console.log(customers)
          }
          res.json(customers)

        }
      )}
      }
    });
  },

  historyDate: function (req, res, next) {
    var movie_id = req.params.id
    db.query("select * from rentals where checked_out = false and movie_id=$1 order by checked_out asc", [movie_id], function(err, movieRecords){
      if(err) {
        var err = new Error("It's an error")
        next(err)
      } else {
        var customers = []
        for (var movie of movieRecords) {
        db.query("select * from customers where id=$1", [movie.customer_id], function(err, customerRecords){
          if(err) {
            var err = new Error("It's an error")
            next(err)
          } else {
            customers.push(customerRecords)
            // console.log(customers)
          }
          res.json(customers)

        }
      )}
      }
    });
  },

  rentalsTitle: function (req, res, next) {
    var movie_id = req.params.id
    db.query("select * from rentals where movie_id = $1 and checked_out = true", [movie_id], function(err, rentalRecords) {
      if(err) {
        throw (new Error(err.message))
      } else {
        db.query("select * from movies where id=$1", [movie_id], function(err, movieRecords){
          if(err) {
            var err = new Error(err.message)
            next(err)
          } else {
            var available = movieRecords[0].inventory - rentalRecords.length
            res.json({movieRecords: movieRecords, available: available})
          }
        });
      }
    })
},
// refactor with join if

  rentalsCustomers: function (req, res, next) {
    var movie_id = req.params.id
    db.query("select * from rentals where movie_id = $1 and checked_out = true", [movie_id], function(err, rentalRecords) {
      if(err) {
        throw (new Error(err.message))
      } else {
        var customerNumbers = []
        for (var record of rentalRecords) {
          customerNumbers.push(record.customer_id)
        }
        res.json({customerIdNumbers: customerNumbers})
    }}
  )
},

  checkout: function (req, res, next) {
    var movie_id = req.params.id
    var customer_id = req.params.customer

    var current_date = new Date()
    var current_day = current_date.getDate()
    var current_month = current_date.getMonth() + 1
    var current_year = current_date.getFullYear()
    var check_out_date = current_year + "-" + current_month + "-" + current_day

    var future_date = new Date(current_date.getTime()+(14*24*60*60*1000));
    var future_day = future_date.getDate()
    var future_month = future_date.getMonth() + 1
    var future_year = future_date.getFullYear()
    var due_date = future_year + "-" + future_month + "-" + future_day

    db.query("insert into rentals (customer_id,movie_id,check_out_date,checked_out,due_date) values ($1,$2,$3,$4,$5)", [customer_id,movie_id,check_out_date,true,due_date], function(err, createRental){
      if(err) {
        var err = new Error("It's an error")
        next(err)
      } else {
        res.json(200)
      }
    });

    },

  return: function (req, res, next) {
    var movie_id = req.params.id
    var customer_id = req.params.customer

    db.query("update rentals set checked_out = false where movie_id=$1 AND customer_id=$2", [movie_id,customer_id], function(err, updateRental){
      if(err) {
        var err = new Error("It's an error")
        next(err)
      } else {
        res.json(200)
      }
    });
  },

  overdue: function (req, res, next) {
    res.send(
      //
    )}
}
module.exports = MovieController
