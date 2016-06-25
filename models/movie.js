var app = require("../app");
var db = app.get("db");

// console.log(db)
var Movie = function(movie) {
  this.id = movie.id;
  this.title = movie.title;
  this.release_date = movie.release_date;
  this.synopsis = movie.overview;
};

// Instance functions

// class
Movie.all = function(callback) {
  db.query("select * from movies", function(error, movies) {
    if(error || !movies) {
      callback(error || new Error("Could not retrieve movies"), undefined);
    } else {
      callback(null, movies.map(function(movie){
        return new Movie(movie);
      }))
    };
  });
};

Movie.sort = function(query, n, p, callback) {
  db.movies.find({}, {
    order: query,
    limit: n,
    offset: p
  }, function(error, movies) {
    if(error || !movies) {
      callback(error || new Error("Could not retrieve movies"), undefined);
    } else {
      var allMovies = movies.map(function(movie) {
        return new Movie(movie);
      });
      callback(null, allMovies)
    };
  });
};


Movie.find = function(input, callback) {
  db.run("SELECT customers.* FROM movies INNER JOIN rentals ON rentals.movie_id=movies.id INNER JOIN customers ON customers.id=rentals.customer_id WHERE rentals.checked=$1 AND movies.search_title=$2", input, function(error,customers) {
   if(error || !customers) {
      callback(error || new Error("Could not retrieve customers customers"), undefined);
    } else {
      callback(null, customers.map(function(customer) {
        return (customer);
      }));
    };
  });
};

Movie.history = function(input, query, callback) {
  // console.log(input)
  db.run("SELECT customers.* FROM movies INNER JOIN rentals ON rentals.movie_id=movies.id INNER JOIN customers ON customers.id=rentals.customer_id WHERE rentals.checked = $1 AND movies.title=$2 ORDER BY " + query + ";", input, function(error,customers) {
   if(error || !customers || customers.length ===0) {
      callback(error || new Error("Could not retrieve a history of customers who have rented this movie."), undefined);
    } else {
      callback(null, customers.map(function(customer) {
        return (customer);
      }));
    }
  });
}



// only attach this function if we're in test mode
if (app.get('env') === 'test') {
  Movie.close_connection = function() {
    console.log("closing connection")
    db.end()
  }
}
module.exports = Movie;
