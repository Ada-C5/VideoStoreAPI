var app = require("../app")
var Customer = require("../models/customer")
var Movie = require("../models/movie")
var db = app.get('db')
// Constructor function
var Rental = function(id) {
  this.id = id
}

Rental.view = function(title, callback) {
  db.run("SELECT overview, release_date FROM movies WHERE title IN (SELECT title FROM rentals WHERE title = $1 AND returned_date IS null)", [title], function(error, rentals) {
    // console.log("rentals: " + JSON.stringify(rentals))
    // console.log("error: " + error)
    if(error) {
      callback(error, undefined)
    } else {
      callback(null, rentals)
    }
  })
}

Rental.customers = function(title, callback) {
  db.run("SELECT name FROM customers WHERE id IN (SELECT customer_id::int FROM rentals WHERE title = $1 AND returned_date IS null)", [title], function(error, customers) {
    if(error) {
      callback(error, undefined)
    } else {
      callback(null, customers)
    }
  })
}

Rental.check_out = function(title, customer_id, callback) {
  Rental.get_movie_id(title, customer_id, callback)
}

Rental.get_movie_id = function (title, customer_id, callback) {
  db.run("SELECT movie_id FROM rentals WHERE title = $1 LIMIT 1", [title], function(error, res)
  {
    if (error) {
      callback(error, undefined)
    } else {
      movie_id = res[0]["movie_id"]
      Rental.new_rental(movie_id, customer_id, title, callback)
      Rental.charge_customer(movie_id, customer_id, title, callback)
    }
  })
}

Rental.new_rental = function (movie_id, customer_id, title, callback) {
  var today = new Date()
  var today_plus_two = new Date(today)
  today_plus_two.setDate(today_plus_two.getDate() + 2)

  db.rentals.save({
    movie_id: movie_id,
    customer_id: customer_id,
    title: title,
    checkout_date: today,
    due_date: today_plus_two,
    returned_date: null
  },
  function (error, rental) {
    if (error) { callback(error, undefined) }
  })
}

Rental.charge_customer = function (movie_id, customer_id, title, callback) {
  db.run("UPDATE customers SET account_credit = account_credit-4 WHERE id=$1", [customer_id], function (error, charged) {
    if (error) {
      callback(error, undefined)
    } else {
      callback(null, charged)
    }
  })
}

Rental.return_rental = function (title, customer_id, callback) {
  var today = new Date()
  db.run("UPDATE rentals SET returned_date = $1 WHERE customer_id::int = $2", [today, customer_id], function(error, result) {
    if (error) {
      callback(error, undefined)
    } else {
      callback(null, result)
    }
  })
}

Rental.current_title = function(title, columns, callback) {
  var options = {
    columns : ['name', 'phone', 'account_credit']
  }
  db.run("SELECT name, phone, account_credit FROM customers WHERE id IN (SELECT customer_id::int FROM rentals WHERE title = $1 AND returned_date IS null)", [title], function(error, customers) {
    if(error) {
      callback(error, undefined)
    } else {
      callback(null, customers)
    }
  })
}

Rental.current_id = function(id, column_name, callback) {
  var options = {
    order : column_name
  }
  db.run("SELECT title FROM movies WHERE title IN (SELECT title FROM rentals WHERE customer_id::int = $1 AND returned_date IS null)", [id], function(error, movies) {
    if(error) {
      callback(error, undefined)
    } else {
      callback(null, movies)
    }
  })
}

Rental.history_title = function(title, column_name, callback) {
  db.run("SELECT name, phone, account_credit FROM customers WHERE id IN (SELECT customer_id::int FROM rentals WHERE title = $1 AND returned_date IS NOT null)", [title], function(error, customer_ids) {
    if(error) {
      callback(error, undefined)
    } else {
      Customer.find_id(customer_ids, column_name)
      callback(null, customer_ids)
    }
  })
}

Rental.history_cust_id = function(id, column_name, columns, callback) {
  db.run("SELECT title FROM rentals WHERE customer_id = $1 AND returned_date IS NOT null", [id], function(error, customer_ids) {
    if(error) {
      callback(error, undefined)
    } else {
      Customer.find_id(customer_ids, column_name)
      callback(null, customer_ids)
    }
  })
}

module.exports = Rental
