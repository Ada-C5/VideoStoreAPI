var app = require("../app");
var db = app.get("db");

var Cust = function(cust) {
  this.id = cust;
};

// class
Cust.all = function(callback) {
  db.query("select * from customers", function(error, custs) {
    if(error || !custs || custs === 0) {
      callback(error || new Error("Could not retrieve customers"), undefined);
    } else {
      var allCusts = custs.map(function(cust) {
        return new Cust(cust);
      });
      // console.log(allCusts)
      callback(null, allCusts)
    };
  });
};

Cust.sort = function(query, n, p, callback) {
  db.customers.find({}, {
    order: query,
    limit: n,
    offset: p
  }, function(error, custs) {
    console.log(custs)
    if(error || !custs) {
      callback(error || new Error("Could not retrieve customer"), undefined);
    } else {
      var allCusts = custs.map(function(cust) {
        return new Cust(cust);
      });
      callback(null, allCusts)
    };
  });
};

Cust.find = function(input, callback) {
  // find all rentals that this customer has checked out
  // console/.log(input)
  db.run("SELECT * FROM movies INNER JOIN rentals ON rentals.movie_id=movies.id WHERE rentals.customer_id=$1 and rentals.checked=$2;", input, function(error, rentals) {
      // console.log(rentals)
   if(error || !rentals || rentals.length ===0) {
      callback(error || new Error("Could not retrieve customers rentals"), undefined);
    } else {
      callback(null, rentals.map(function(rental) {
        return rental;
      }));
    };
  });
};

Cust.history = function(input, query, callback) {
  db.run("SELECT * FROM movies INNER JOIN rentals ON rentals.movie_id=movies.id WHERE rentals.customer_id=$1 and rentals.checked=$2 ORDER BY " + query + ";" , input, function(error, rentals) {
      // console.log(rentals)
   if(error || !rentals || rentals.length === 0) {
      callback(error || new Error("Could not retrieve customers rentals"), undefined);
    } else {
      callback(null, rentals.map(function(rental) {
        return (rental);
      }));
    }
  });
}

// only attach this function if we're in test mode
// if (app.get('env') === 'test') {
//   Cust.close_connection = function() {
//     console.log("closing connection")
//     db.end()
//   }
// }
module.exports = Cust;
