var app = require("../app");
var db = app.get("db");

// Constructor function
var Rental = function(rental) {
  this.title  = rental.title;
  this.id = rental.id;
  this.checkout_date = rental.checkout_date;
  this.due_date = rental.due_date;
  this.status = rental.status
  this.name = rental.name
};

Rental.currentCheckedOut = function(input,callback){
  // var order = input.shift()
  db.run("select * from (select * from rentals,movies where rentals.movie_id=movies.id) as joined where customer_id=$1 and status=$2;",input, function(error, rentals) {
    if(error || !rentals) {
      callback(error || new Error("Could not retrieve rentals"), undefined);
    } else {
      callback(null, rentals.map(function(rental) {
        return new Rental(rental);
      }));
    }
  });
}

Rental.all = function (input,callback) {
  // var order = input.shift()
  db.run("select * from (select * from rentals,movies where rentals.movie_id=movies.id) as joined where customer_id=$1 order by due_date;", input, function (error, rentals) {
    if(error || !rentals) {
      callback(error || new Error("Could not retrieve rentals"), undefined);
    } else {
      callback(null, rentals.map(function (rental) {
        return new Rental(rental);
      }));
    }
  });
}

Rental.overdueList = function (callback) {
  db.run("SELECT customers.name, movies.title, checkout_date, due_date FROM (SELECT customer_id, movie_id, due_date, checkout_date FROM rentals WHERE status='overdue') as overdues INNER JOIN customers ON (overdues.customer_id = customers.id) INNER JOIN movies ON (overdues.movie_id = movies.id);", function (error, rentals) {
    console.log("halp")
    if(error || !rentals) {
      callback(error || new Error("Could not retrieve rentals"), undefined);
    } else {
      callback(null, rentals.map(function (rental) {
        return new Rental(rental);
      }));
    }
  });
}

Rental.checkOut = function (input, callback) {
    db.movies.findOne({title: input[0]}, function (error, found_id) {
      console.log(found_id.id)
      db.run("UPDATE movies SET inventory=inventory-1 WHERE title=$1;", [found_id.title], function (error, meh) {})
      db.rentals.save({customer_id: input[1], movie_id: found_id.id, due_date: due(), checkout_date: today(), status: "checked_out"}, function (error, rentals) {
        rentals = [rentals]
        if(error || !rentals) {
          callback(error || new Error("Could not retrieve rentals"), undefined);
        } else {
          callback(null, rentals.map(function (rental) {
            return new Rental(rental);
          }))
        }
      })
    })
}

due = function () {
  date = new Date(Date.now() + 1000000000) // uhh magic number.. adds 12 days

  yr = date.getFullYear().toString()
  mo = (date.getMonth()+1).toString()
  mo = mo[1] ? mo : "0" + mo[0]
  da = date.getDate().toString()
  da = da[1] ? da : "0" + da[0]
  fdate = yr + "-" + mo + "-" + da
  return fdate

}

today = function () {
  date = new Date(Date.now())

  yr = date.getFullYear().toString()
  mo = (date.getMonth()+1).toString()
  mo = mo[1] ? mo : "0" + mo[0]
  da = date.getDate().toString()
  da = da[1] ? da : "0" + da[0]
  fdate = yr + "-" + mo + "-" + da
  return fdate
}

// Rental.overdueList = function (input, callback) {
//   db.run("SELECT id FROM movies WHERE title=$1;", input, db.rentals.save(error , function (error, rentals) {
//     console.log("halp")
//     if(error || !rentals) {
//       callback(error || new Error("Could not retrieve rentals"), undefined);
//     } else {
//       callback(null, rentals.map(function (rental) {
//         return new Rental(rental);
//       }));
//     }
//   }))
// }





// Rental.all = function (input, callback) {
//   var order = input.shift()
//   db.run("SELECT * FROM (SELECT customer_id, checkout_date FROM rentals WHERE (SELECT id FROM movies WHERE movies.title = $1) = movie_id) as new_ids JOIN customers ON (new_ids.customer_id = customers.id) ORDER BY " + order + ";", input, function (error, rentals) {
//     if(error || !rentals) {
//       callback(error || new Error("Could not retrieve rentals"), undefined);
//     } else {
//       callback(null, rentals.map(function (rental) {
//         return new Rental(rental);
//       }));
//     }
//   });
// }
module.exports = Rental
