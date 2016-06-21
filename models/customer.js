var app = require("../app");
var db = app.get("db");

var Cust = function(cust) {
  this.id = cust;
  // this.id = cust.id;
  // this.name = cust.name;
  // this.address = cust.address;
};

// var Movie = function(movie) {
//   this.title = movie.title;
//   // this.id = cust.id;
//   // this.name = cust.name;
//   // this.address = cust.address;
// };

// Instance functions


// class
Cust.all = function(callback) {
  db.query("select * from customers", function(error, custs) {
    if(error || !custs) {
      callback(error || new Error("Could not retrieve custs"), undefined);
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
    if(error || !custs) {
      callback(error || new Error("Could not retrieve customer"), undefined);

    // } else if ((query != "name") && (query != "registered_at") && (query != "postal_code")) {
    //   callback(error || new Error("Undefined sort term"), undefined);
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
   if(error || !rentals) {
      callback(error || new Error("Could not retrieve customers rentals"), undefined);
    } else {
      callback(null, rentals.map(function(rental) {
        return rental;
      }));
    };
  });
};
// Cust.find = function(ids, callback) {
//   // find all rentals that this customer has checked out
//     db.rentals.find({customer_id: ids, checked: "true"}, function(error, rentals) {
//       // console.log(rentals)
//     if(error || !rentals) {
//       callback(error || new Error("Could not retrieve rentals"), undefined);
//     } else {
//         // callback(null, rentals.map(function(rental) {
//         var arrayOfMovies = [];
//
//         var allMovies = rentals.map(function(rental) {
//           console.log(rental)
//           db.query("select * from movies where id=$1", [rental.movie_id], function(error, movie) {
//           // console.log(rental.movie_id)
//             // new Movie(rental);
//             return arrayOfMovies.push(new Movie(movie[0]))
//             console.log(arrayOfMovies)
//             // console.log(movie[0].title)
//             // return arrayOfMovies;
//           });
//             // console.log(arrayOfMovies)
//
//           // return new Movie(movie[0]);
//         });
//         console.log(allMovies)
//         console.log(arrayOfMovies)
//         // return arrayOfMovies;
//         callback(null, arrayOfMovies)
//       // console.log(arrayOfMovies)
//       // callback(null, movie)
//     };
//   });
// };


Cust.history = function(input, query, callback) {
  db.run("SELECT * FROM movies INNER JOIN rentals ON rentals.movie_id=movies.id WHERE rentals.customer_id=$1 and rentals.checked=$2 ORDER BY " + query + ";" , input, function(error, rentals) {
      // console.log(rentals)
   if(error || !rentals) {
      callback(error || new Error("Could not retrieve customers rentals"), undefined);
    } else {
      callback(null, rentals.map(function(rental) {
        return (rental);
      }));
    }
  });
}

// only attach this function if we're in test mode
if (app.get('env') === 'test') {
  Cust.close_connection = function() {
    console.log("closing connection")
    db.end()
  }
}
module.exports = Cust;
