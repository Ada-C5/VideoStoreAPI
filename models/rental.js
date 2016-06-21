var app = require('../app')
var db = app.get("db")
// var Movie = require('./movie')

var Rental = function (rental) {
  this.rental = rental;
};

//  /rentals/:movie
//  returns overview, release_date available inventory and total inventory
Rental.search = function (input, callback) {
  db.run("SELECT overview, release_date, inventory, inventory_total FROM movies WHERE search_title=$1", input, function (error, movie) {
    if (error || !movie) {
      callback(new Error("Could not retrieve movie"), undefined)
    } else {
      callback(null, movie.map (function (movies) {
        return (movies)
      }));
    }
  });
}

//  /rentals/:movie/customers
//  returns list of customers (assume its full info)
Rental.searchCust = function (input, callback) {
  console.log(input)
  db.run("SELECT customers.* FROM movies INNER JOIN rentals ON rentals.movie_id=movies.id INNER JOIN customers ON customers.id=rentals.customer_id WHERE rentals.checked=$1 AND search_title=$2", input, function (error, customer) {
    if (error || !customer) {
      callback(new Error("Could not retrieve customer"), undefined)
    } else {
      callback(null, customer.map (function (customers) {
        return (customers)
      }));
    }
  });
}



Rental.checkout = function (customer_id, movie, callback) {
  // check to see if movie exists
  db.run("SELECT movies.id from movies WHERE search_title=$1", movie, function (error, movieid) {
  if (error || !movieid || movieid.length===0) {
    callback(new Error("Could not retrieve movie based on movie title."), undefined)
  } else {

    // check to see if there is inventory
    db.run("SELECT * from movies WHERE search_title=$1 AND inventory > 0", movie, function (error, movieinfo) {
    if (error || !movieinfo || movieinfo.length===0) {
      callback(new Error("Movie is not available to rent. Zero inventory."), undefined)
    } else {

      // check to see if customer exists
      db.run("SELECT customers.id from customers WHERE id=$1", customer_id, function (error, customerid) {
      if (error || !customerid || customerid.length===0) {
        callback(new Error("Could not retrieve customer from database. Customer id should be sent in JSON body."), undefined)
      } else {

        // update RENTALSSSS. this should always work, thanks to the movie and customer checks above.
        var insertArray = [];
        // duedate is 7 days after Date.now
        var duedate = (new Date(Date.now(new Date())+604800000)).toString();
        insertArray.push(movieid[0]["id"], customer_id[0], 'true', (new Date()).toString(), duedate)
        db.run("INSERT INTO rentals (movie_id, customer_id, checked, rental_date, due_date) VALUES ($1, $2, $3, $4, $5);", insertArray, function (error, rentals) {
          if (error || !rentals) {
            callback(new Error("Could not update rental info"), undefined)
          } else {

            // update customer credit -1.50 AFTER making the rental
            db.run("UPDATE customers SET account_credit=account_credit-1.5 WHERE id=$1 AND account_credit > 1.45;", customer_id, function (error, updates) {
            if (error || !updates) {
              callback(new Error("Could not update customer credit, might not have enough money"), undefined)
            } else {

              // update movie inventory
              db.run("UPDATE movies SET inventory=inventory-1 WHERE search_title=$1;", movie, function (error, updatesmovie) {
              if (error || !updatesmovie) {
                callback(new Error("Could not update movie inventory"), undefined)
              } else {

                // NO ERRORSSSSS! return the due date for the rental
                callback(null, {return_date: duedate});
              }
            })
          }});
        }});
      }});
    }});
  }});
};

Rental.return = function (customer_id, movie_title, callback) {
  // check to see if movie exists
  db.movies.where("search_title=$1", movie_title, function (error, movie) {
    // console.log(movie)
  if (error || !movie) {
    callback(new Error("Could not retrieve movie based on given movie title"), undefined)
  } else {
    // if no errors, check to see if customer exists
    db.customers.where("id=$1", customer_id, function (error, customer) {
      if (error || !customer) {
        callback(new Error("Could not retrieve customer from database"), undefined)
      } else {
        // does this person even have a rental??
        var arrCheck = []
        arrCheck.push(customer_id[0], movie[0].id, 'true')
        console.log(arrCheck)
        db.run("SELECT * FROM rentals WHERE customer_id=$1 AND movie_id=$2 AND checked=$3", arrCheck, function (error, rental) {
          console.log(rental)
          if (error || !rental || rental.length===0) {
            callback(new Error("This customer does not have this movie checked out"), undefined)
          } else {

            // if no errors, customer, movie and rentals exist.
            //  update rentals back to checked in
            var insertArray = [];
            var returndate = (new Date()).toString();
            insertArray.push('false', returndate, customer_id[0], movie[0].id)
            console.log(insertArray)
            db.run("UPDATE rentals SET checked=$1, return_date=$2 WHERE customer_id=$3 AND movie_id=$4;", insertArray, function (error, rentalupdate) {
              if (error || !rentalupdate) {
                callback(new Error("Could not update rental info"), undefined)
              } else {
                // update movie inventory
                  db.run("UPDATE movies SET inventory=inventory+1 WHERE search_title=$1;", movie_title, function (error, updatesmovie) {
                  if (error || !updatesmovie) {
                    callback(new Error("Could not update movie inventory"), undefined)
                  } else {
                    callback(undefined, rentalupdate)
              }})
            }})
          }})
        }})
      }})
    }
  //   })
  //   }})
  // }
  // var insertArray = [];
  // var returndate = (new Date(Date.now(new Date())+604800000)).toString();
  // insertArray.push(movieid[0]["id"], customer_id[0], 'true', (new Date()).toString(), returndate)

    // console.log("movie id: ", movieid)
//
//
//         // console.log(updates)
//         // if no errors, update movie inventory
//         db.run("UPDATE movies SET inventory=inventory-1 WHERE search_title=$1;", movie, function (error, updatesmovie) {
//         if (error || !updatesmovie) {
//           callback(new Error("Could not update movie inventory"), undefined)
//         } else {
//
//           // if no errors, update RENTALSSSS
//           var insertArray = [];
//           var returndate = (new Date(Date.now(new Date())+604800000)).toString();
//           insertArray.push(movieid[0]["id"], customer_id[0], 'true', (new Date()).toString(), returndate)
//
//           db.run("INSERT INTO rentals (movie_id, customer_id, checked, rental_date, due_date) VALUES ($1, $2, $3, $4, $5);", insertArray, function (error, rentals) {
//             if (error || !rentals) {
//               callback(new Error("Could not update rental info"), undefined)
//             } else {
//               callback(null, {return_date: returndate});
//             }
//           })
//         }});
//       }});
//     }});
//   }});
// };







      // callback(null, inventories)

      //   return (inventories)
    // }})
  // });

  // }});

  // db.run("INSERT INTO rentals (movie_id, customer_id, checked, rental_date, due_date) VALUES (5, 1, 'true', '2016-07-19', '2016-07-31');", customer_id, function (error, inventory) {
  //   if (error || !inventory) {
  //     callback(new Error("Could not retrieve inventory"), undefined)
  //   } else {
  //     callback(null, inventory.map (function (inventories) {
  //       return (inventories)
  //     }));
  //   }
  // });
  //
  // db.run("UPDATE customers SET account_credit=account_credit-1.5 WHERE id=$1;", customer_id, function (error, inventory) {
  //   if (error || !inventory) {
  //     callback(new Error("Could not retrieve inventory"), undefined)
  //   } else {
  //     callback(null, inventory.map (function (inventories) {
  //       return (inventories)
  //     }));
  //   }
  // });

// }
//
// Rental.find = function (title, callback) {
//   db.movies.search({columns:["title"], term: title}, function (error, movies) {
//     if (error || !movies) {
//       callback(new Error("Could not retrieve movies"), undefined)
//     } else {
//       callback(null, movies.map (function (movie) {
//         return new Movie(movie)
//       }))
//     }
//   })
// }

module.exports = Rental;
