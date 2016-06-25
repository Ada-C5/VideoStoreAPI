var app = require("../app");
var db = app.get("db");

var Movies = function(id) {
  this.id = id;
};

Movies.all = function(callback) {
  db.run('select * from movies', function (error, result) {
    if (error){
      callback(error, undefined);
    } else {
      callback(null, result);
    }
  });
};

Movies.byTitle = function(num, p, callback) {
  db.movies.find({}, {order: 'title asc', limit: num, offset: p}, function (error, result) {
    if (error){
      callback(error, undefined);
    } else {
      callback(null, result);
    }
  });
};

Movies.byRelease = function(num, p, callback) {
  db.movies.find({}, {order: 'release_date asc', limit: num, offset: p}, function (error, result) {
    if (error){
      callback(error, undefined);
    } else {
      callback(null, result);
    }
  });
};

Movies.deets = function(title, callback) {
  db.movies.where('title=$1', title, function (error, result) {
    if (error){
      callback(error, undefined);
    } else {
      callback(null, result);
    }
  });
};

Movies.currentCustomers = function(title, callback) {
  db.run('select customers.name, customers.phone, customers.account_credit from rentals, customers where rentals.customer_id = customers.id and rentals.title=$1 and rentals.returned_date is null;', [title], function(error, result) {
    if (error){
      callback(error, undefined);
    } else {
      callback(null, result);
    }
  });
};

Movies.historyByCust = function(title, callback){
  db.run('select customers.name, customers.phone, customers.account_credit from rentals, customers where rentals.customer_id = customers.id and rentals.title=$1 and rentals.returned_date is not null order by customers.name asc;', [title], function (error, result) {
    if (error){
      callback(error, undefined);
    } else {
      callback(null, result);
    }
  });
};

Movies.historyByCODate = function(title, callback) {
  db.run('select customers.name, customers.phone, customers.account_credit from rentals, customers where rentals.customer_id = customers.id and rentals.title=$1 and rentals.returned_date is null order by checkout_date asc;', [title], function(error, result) {
    if (error){
      callback(error, undefined);
    } else {
      callback(null, result);
    }
  });
};


Movies.end = function () { db.end() }

module.exports = Movies
