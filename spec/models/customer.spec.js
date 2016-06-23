var app = require("../../app");
var db = app.get("db");

var Customer = require('../../models/customer')

describe('Customer', function () {
  var customer1 = "Ania Gonzalez"
  var city1 = "Sammamish"

  afterEach(function () {
    // delete all the customers I created
    db.end()
  })

  describe('#all', function() {
    it('should return all the customers in db', function (done) {
      Customer.all(function (error, customers) {
        expect(error).toBeNull
        expect(customers.length).toEqual(200)
      })
      done()
    })

    it('should return an array', function (done) {
      Customer.all(function (error, customers) {
        expect(error).toBeNull
        expect(customers.isArray).toEqual(true)
      })
      done()
    })

  })

  describe('#sortBy', function () {
    it('should return a sorted list of customers', function (done) {
      Customer.sortBy("name", 1, 2, function (error, customers) {
        expect(customers.length).toEqual(1)
        // expect(customers[0].title).toEqual(title1)
        // expect(customers[0].overview).toEqual(overview1)
        // expect(customers[0].inventory).toEqual(inventory1)
      })
    done()
    })
  })



})
