var app = require('../../app')
var db = app.get('db')
var Customer = require('../../models/customers')

//mock customer data 
describe('Customer', function () {
  var customer_test = "Gideon Defoe"
  var registered_at_test = "Mon, 15 Feb 2015 09:00:14 -0700"
  var address_test = '1234 Electric Avenue'
  var city_test = "London"
  var state_test = "Texas"
  var postal_code_test = "76854"
  var phone_test = "(325) 237-4026"
  var account_credit_test = "75.12"

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
})