var app = require("../app");
var db = app.get("db");

var Rentals = function(id) {
  this.id = id;
};

Rentals.deets = function(title , callback) {
  console.log(title)
  db.movies.find({title: title}, function(error, result){
    if(error) {
      callback(error, undefined);
    } else {
      callback(null, result);
    }
  });
};

Rentals.whoRentedThis = function(title, callback){
  db.run('select customers.name, customers.phone, customers.account_credit from rentals, customers where rentals.customer_id = customers.id and rentals.title=$1 and rentals.returned_date is null;', [title], function(error, result) {
    if(error) {
      callback(error, undefined);
    } else {
      callback(null, result);
    }
  });
};

const doCheckout = (customer, movie, callback) => {
  var checkOutLength = 259200000
  var today = new Date()
  var today_in_seconds = today.getTime()
  var due_seconds = today_in_seconds + checkOutLength
  var due_date = new Date(due_seconds)
  var rental_cost = 2

  db.movies.save({id: movie.id, stock: movie.stock - 1  }, function(err, res){})

  var credit = movie.account_credit - rental_cost
  db.customers.save({id: customer.id, account_credit: credit }, function(err, res){})

  db.rentals.save({movie_id: movie.id, title: movie.title, customer_id: customer.id, checkout_date: today, due_date: due_date}, function(err, result){
    if(err) {
      callback(err, undefined);
    } else {
      callback(null, result);
    }
  });
}

Rentals.checkout = function(title, id, callback){
  db.movies.where('title = $1', [title], function(err, movies) {
    if (movies.length  == 0) return callback(null, "No can has movie")
    if (movies[0].stock <= 0) return callback(null, "That movie is out of stock.")

    db.customers.find({id: id}, function(err, customer){
      if (customer.length == 0 || err) return callback(null, "Who is that? They don't patronize our fabulous video store.")

      doCheckout(customer[0], movies[0], callback)
    })
  })
}

Rentals.checkin = function(title, id, callback){
  var today = new Date()
  db.rentals.where('title = $1 AND customer_id = $2', [title, id], function(error, result) {
    db.movies.find({title: title}, function(err, result){
      if (result[0] == null){
        callback(null, "NOooooOOOOooo")
      } else {
        var stock = result[0].stock + 1
        db.movies.save({id: result[0].id, stock: stock }, function(err, res){})
        db.rentals.save({id: result[0].id, returned_date: today}, function(err, inserted){
          if(err) {
            callback(err, undefined);
          } else {
            callback(null, inserted);
          }
        })
      }
    })
  })
}

Rentals.overdue = function(callback){
  var today = new Date()
  db.run("select customers.name, rentals.title , rentals.checkout_date, rentals.due_date from customers, rentals where rentals.customer_id = customers.id and rentals.returned_date is null and rentals.due_date < $1;", [today], callback)
}

Rentals.end = function () { db.end() }
module.exports = Rentals;
