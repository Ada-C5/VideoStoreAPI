var app = require('../../app')
var db = app.get('db')

var Customer = require('../../models/customer')

describe('Customer', function () {
  var customer1 = "Acton Gilliam"
  var registered_at1 = "Thu, 26 Feb 2015 20:00:53 -0800"
  var address1 = 'Ap #508-8214 Senectus Av.'
  var city1 = "Portland"
  var state1 = "Oregon"
  var postal_code1 = "62594"
  var phone1 = "(903) 973-1984"
  var account_credit1 = "48.64"

  afterEach(function () {
    db.end()
  })

  describe('#all', function () {
    it('should return all customers', function (done) {
      Customer.all(function (error, customers) {
        expect(customers.length).toEqual(200)
        done()
      })
    })
  })

  describe('#find', function () {
    it('should return correct customer', function (done) {
       Customer.find(customer1, function (error, customer) {
        expect(customer.name).toEqual(customer1)
        expect(customer.registered_at).toEqual(registered_at1)
        expect(customer.address).toEqual(address1)
        expect(customer.city).toEqual(city1)
        expect(customer.state).toEqual(state1)
        expect(customer.postal_code).toEqual(postal_code1)
        expect(customer.phone).toEqual(phone1)
        expect(customer.account_credit).toEqual(account_credit1)
        expect(error).toBeNull
        done()
      })
    })

    it('should throw an error if the customer DNE', function (done) {
      Customer.find("person", function(error, customer) {
        expect(error.message).toEqual("Customer not found")
        done()
      })
    })
  })

  describe('#sort', function () {
    it('should sort customer by name', function(done) {
      Customer.sort("name", 1, 3, function(error, customer_array) {
        expect(customer_array.length).toEqual(1)
        expect(customer_array[0].name).toEqual(customer1)
        expect(customer_array[0].registered_at).toEqual(registered_at1)
        expect(customer_array[0].address).toEqual(address1)
        expect(customer_array[0].city).toEqual(city1)
        expect(customer_array[0].state).toEqual(state1)
        expect(customer_array[0].postal_code).toEqual(postal_code1)
        expect(customer_array[0].phone).toEqual(phone1)
        expect(customer_array[0].account_credit).toEqual(account_credit1)
        expect(error).toBeNull
        done()
      })
    })

    it('should throw an error if the customer DNE', function (done) {
      Customer.sort("abcd", 1, 3, function(error, customer_array2) {
        expect(error.message).toEqual("Could not retrieve customers")
        done()
      })
    })
  })
})
