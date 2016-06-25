var Customer = require('../../models/customer')
var Rental = require('../../models/rental')
var app = require("../../app")
var db = app.get("db")

describe('Customer', function () {
  // beforeEach(function () {
  //   Customer.clean()
  // })

  afterEach(function () {
    Customer.end()
  })

  describe('.all', function () {
    it('should return all customers', function (done) {
      Customer.all(function (error, customers) {
        expect(customers.length).toEqual(200)
        expect(Object.prototype.toString.call(customers)).toBe('[object Array]')
        done()
      })
    })
  })

  describe('.nameSort', function () {
    it('should return all customers, sorted by name', function (done) {
      Customer.nameSort(function (error, customers) {
      expect(customers.length).toEqual(200)
      expect(Object.prototype.toString.call(customers)).toBe('[object Array]')
      done()
      })
    })
  })

  describe('.registeredSort', function () {
    it('should return all customers, sorted by date registered', function (done) {
      Customer.nameSort(function (error, customers) {
      expect(customers.length).toEqual(200)
      expect(Object.prototype.toString.call(customers)).toBe('[object Array]')
      done()
      })
    })
  })

  describe('.postalSort', function () {
    it('should return all customers, sorted by zipcode', function (done) {
      Customer.nameSort(function (error, customers) {
      expect(customers.length).toEqual(200)
      expect(Object.prototype.toString.call(customers)).toBe('[object Array]')
      done()
      })
    })
  })

  // This test is currently broken and needs to be refactored.
  //
  // describe('.currentrentals', function () {
  //   it('should return all current checkouts to a given customer', function (done) {
  //     var beforeRecords = db.run('select count(*) from rentals;')
  //     console.log(beforeRecords)
  //     Rental.checkout("King Kong", '8', function(error, result){})
  //     Customer.currentrentals(8, function(error, result){ 
  //       expect(result.length()).toBe(beforeRecords + 1)
  //       expect(Object.prototype.toString.call(result)).toBe('[object Array]')
  //       done()
  //     })
  //   })
  // })
})
