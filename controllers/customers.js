var Massive = require("massive");
var db = Massive.connectSync({db : "video_store"});

var CustomerController = {
  allCustomers: function (req, res, next) {
    db.query("select * from customers", function(err, customerRecords){
      if(err) {
        var err = new Error("It's an error")
        next(err)
      } else {
        res.json(customerRecords)
      }
    });
  },

  sortName: function (req, res, next) {
    var n = req.query.n
    var p = req.query.p
    if (n === undefined) { n = 10 }
    if ( p === undefined) { p = 1 }
    db.query("select * from customers order by name asc limit $1 offset $2", [n, p], function(err, customerRecords){
      if(err) {
        var err = new Error("It's an error")
        next(err)
      } else {
        res.json(customerRecords)
      }
    });
  },

  sortDate: function (req, res, next) {
    var n = req.query.n
    var p = req.query.p
    if ( n === undefined) { n = 10 }
    if ( p === undefined) { p = 1 }
    db.query("select * from customers order by registered_at asc limit $1 offset $2", [n], function(err, customerRecords){
      if(err) {
        var err = new Error("It's an error")
        next(err)
      } else {
        res.json(customerRecords)
      }
    });
  },

  sortPostalCode: function (req, res, next) {
    var n = req.query.n
    var p = req.params.p
    if ( n === undefined) { n = 10 }
    if ( p === undefined) { p = 1 }
    db.query("select * from customers order by postal_code asc limit $1", [n, p], function(err, customerRecords){
      if(err) {
        var err = new Error("It's an error")
        next(err)
      } else {
        res.json(customerRecords)
      }
    });
  },

  current: function (req, res, next) {
    var customerId = req.params.id
    db.query("select * from rentals where checked_out = true and customer_id=$1 order by due_date asc", [customerId], function(err, movieRecords){
      if(err) {
        var err = new Error(err.message)
        next(err)
      } else {
        res.json(movieRecords)
      }
    });
  },

  history: function (req, res, next) {
    var customerId = req.params.id
    db.query("select * from rentals where checked_out = false and customer_id=$1 order by due_date asc", [customerId], function(err, movieRecords){
      if(err) {
        var err = new Error(err.mesage)
        next(err)
      } else {
        res.json(movieRecords)
      }
    });
  }
}

module.exports = CustomerController
