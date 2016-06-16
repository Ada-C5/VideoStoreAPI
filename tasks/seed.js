var massive = require('massive')
var connectionString = "postgres://localhost/extreme_video_express"
var db = massive.connectSync({connectionString : connectionString})

var video_data = require("../db/seeds/videos.json")
var cust_data = require("../db/seeds/customers.json")

var video_records = video_data.length
var cust_records = cust_data.length

// This will count the number of records and tell us if the seeding has completed
// function checkFinish() {
//   db.videos.count(function(err, res1) {
//     console.log("videos in db: ", res1)
//     if (res1 >= video_records) {
//       console.log("Yay! I'm done with videos!")
//       db.customers.count(function(err, res2) {
//         console.log("customers in db: ", res2)
//         if (res2 >= cust_records) {
//           console.log("Yay! I'm done with customers!")
//           process.exit()
//         }
//       })
//     }
//   })
// }

var check1 = function checkVideo() {
  db.videos.count(function(err, res) {
  console.log("videos in db: ", res)
    if (res >= video_records) {
      console.log("Yay! I'm done with videos!")
      return true;
    }
  })
}

var check2 = function checkCust() {
  db.customers.count(function(err, res) {
  console.log("customers in db: ", res)
    if (res >= cust_records) {
      console.log("Yay! I'm done with customers!")
      return true;
    }
  })
}

var make = function(){
  for (var record of video_data) {
    db.videos.save(record, function(err, res) {
      console.log("saved: ", JSON.stringify(res))
      check1()
    })
  }

  for (var record of cust_data) {
    db.customers.save(record, function(err, res) {
      console.log("saved: ", JSON.stringify(res))
      check2()
    })
  }

  if ((check1() === true) && (check2() === true)) {
    process.exit()
  }
}

make()
